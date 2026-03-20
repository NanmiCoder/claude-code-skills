# 飞书 Channel

通过 MCP 服务器将飞书机器人连接到 Claude Code。

MCP 服务器通过 WebSocket 连接飞书，为 Claude 提供回复、表情回应、编辑消息等工具。当你给机器人发消息时，服务器会将消息转发到你的 Claude Code 会话。无需公网 URL。

## 前置条件

- [Bun](https://bun.sh) — MCP 服务器运行在 Bun 上。安装：`curl -fsSL https://bun.sh/install | bash`

## 快速开始
> 默认 open 策略，适用于单用户私聊机器人。配对和白名单设置见 [skills/access/SKILL.md](./skills/access/SKILL.md)。

**1. 在飞书开放平台创建自建应用。**

打开 [open.feishu.cn/app](https://open.feishu.cn/app) → 创建应用 → 企业自建应用。填写名称和描述。

**2. 开启机器人能力并配置事件。**

- 进入「添加应用能力」→ 选择「机器人」
- 进入「事件与回调」→ 请求方式选择 **WebSocket**
- 添加事件：`im.message.receive_v1`

**3. 申请权限。**

在「权限管理」中申请以下权限：

- `im:message` — 读取和发送消息
- `im:message:send_as_bot` — 以机器人身份发送消息
- `im:resource` — 获取消息中的资源文件（图片、文件）
- `im:message.reactions:write` — 添加表情回应

**4. 发布应用。**

进入「版本管理与发布」→ 创建版本 → 提交。企业内部应用通常自动审核通过。

**5. 获取凭证。**

在「凭证与基础信息」页面，复制 **App ID**（`cli_xxx`）和 **App Secret**。

**6. 安装插件并配置。**

以下是 Claude Code 命令 — 先运行 `claude` 启动会话。

安装插件：
```
/plugin install feishu-channel@claude-code-skills
/reload-plugins
```

配置凭证：
```
/feishu:configure cli_xxx your_app_secret
```

会将 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` 写入 `~/.claude/channels/feishu/.env`。你也可以手动编辑该文件，或在 shell 中设置环境变量 — 环境变量优先级更高。

可选配置项：
```
FEISHU_ENCRYPT_KEY=xxx           # 事件加密密钥
FEISHU_VERIFICATION_TOKEN=xxx    # 验证 Token
FEISHU_BRAND=feishu              # "feishu"（国内）或 "lark"（海外）
```

**7. 带 channel 标志重新启动。**

不带此标志服务器不会连接 — 退出当前会话，重新启动：

```sh
claude --channels plugin:feishu-channel@claude-code-skills
```

本地开发：
```sh
claude --plugin-dir ./plugins/feishu-channel \
       --dangerously-load-development-channels plugin:feishu-channel
```

**8. 开始聊天。**

在飞书中私聊你的机器人 — 消息会到达 Claude Code 会话。默认访问策略是 `open`（任何人都可以发消息）。如需限制访问：

```
/feishu:access policy pairing
```

之后用户需要向机器人发送 "pair" 获取配对码，你在终端中用 `/feishu:access pair <code>` 批准。

## 访问控制

默认策略为 `open`。生产环境建议切换为 `pairing` 或 `allowlist`。

| 命令 | 用途 |
| --- | --- |
| `/feishu:access` | 查看当前状态 |
| `/feishu:access policy <open\|pairing\|allowlist>` | 切换策略 |
| `/feishu:access pair <code>` | 批准配对 |
| `/feishu:access allow <open_id>` | 直接添加用户 |
| `/feishu:access remove <open_id>` | 移除用户 |

## 暴露给 Claude 的工具

| 工具 | 用途 |
| --- | --- |
| `reply` | 发送消息。接收 `chat_id` + `text`，可选 `reply_to`（消息 ID，用于引用回复）和 `files`（绝对路径，用于附件）。图片（`.jpg`/`.png`/`.gif`/`.webp`）以图片消息发送，其他类型以文件消息发送。单文件最大 50MB。 |
| `react` | 为消息添加表情回应。使用飞书表情类型（`THUMBSUP`、`HEART`、`DONE`、`SMILE`、`OK`、`CLAP` 等）。 |
| `edit_message` | 编辑机器人之前发送的消息。仅能编辑机器人自己的消息。 |

## 无历史记录和搜索

飞书 Bot API **不提供**消息历史记录和搜索功能。机器人只能看到实时到达的消息。如果 Claude 需要之前的上下文，会让你粘贴或总结。

## License

Apache-2.0
