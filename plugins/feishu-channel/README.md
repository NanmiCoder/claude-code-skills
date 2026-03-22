# 飞书 Channel

通过 MCP 服务器将飞书机器人连接到 Claude Code。

MCP 服务器通过 WebSocket 连接飞书，为 Claude 提供回复、表情回应、编辑消息等工具。当你给机器人发消息时，服务器会将消息转发到你的 Claude Code 会话。无需公网 URL。

## 前置条件

- [Bun](https://bun.sh) — MCP 服务器运行在 Bun 上。安装：`curl -fsSL https://bun.sh/install | bash`

## 快速开始
> 默认 open 策略，适用于单用户私聊机器人。配对和白名单设置见 [skills/access/SKILL.md](./skills/access/SKILL.md)。

**1. 使用飞书官方教程一键创建 Echo Bot。**

直接使用飞书官方教程：[开发一个回声机器人](https://open.feishu.cn/document/develop-an-echo-bot/introduction?from=op_develop_app)。

这个流程会直接帮你创建并发布一个可体验的机器人，教程里默认配置的机器人能力、长连接事件订阅和权限已经足够用来体验本插件。不需要再按旧流程手动创建应用、逐项配权限、再单独发布。

**2. 获取凭证。**

在飞书开放平台里打开刚刚创建的应用，在「凭证与基础信息」页面复制：

- **App ID**（`cli_xxx`）
- **App Secret**

**3. 安装插件并配置。**

先正常启动一次 Claude Code，然后执行：

安装插件：
```
/plugin install feishu-channel@claude-code-skills
```

安装完以后，`/reload-plugins` 不够，必须退出并重新启动 Claude Code。

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

**4. 重新启动 Claude Code。**

退出当前会话，使用下面命令重新启动：

```sh
claude --allow-dangerously-skip-permissions --dangerously-load-development-channels plugin:feishu-channel@claude-code-skills
```

如果你所在的是 Team / Enterprise 组织，还需要管理员开启 `channelsEnabled`。没开时也会出现 “MCP 连上了，但 channel 消息收不到” 的现象。

**5. 开始聊天。**

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

## 排障

如果飞书那边能确认消息已送达，终端里也看到了：

- `WebSocket connected, listening for messages...`
- `Inbound message ...`
- `Delivered message ... to Claude channel`

但 Claude Code session 里仍然没有 `<channel source="feishu" ...>` 事件，优先检查：

1. Claude 是否使用了 `--allow-dangerously-skip-permissions --dangerously-load-development-channels plugin:feishu-channel@claude-code-skills`
2. 组织策略里是否启用了 `channelsEnabled`
3. 当前 Claude session 是否仍然保持打开
4. 发送者是否被访问策略拒绝

如果你刚执行过 `/plugin install feishu-channel@claude-code-skills`，但飞书消息完全没有进入会话，先退出 Claude Code 再按上面的启动命令重启，不要只执行 `/reload-plugins`。

## License

Apache-2.0
