# 本地开发调试指南

本文档介绍如何在本地开发和调试 Claude Code Skills。

## 前置要求

- Claude Code CLI 已安装（版本 1.0.33+）
- 已完成 Claude Code 认证

```bash
# 检查版本
claude --version

# 如需更新
npm update -g @anthropic-ai/claude-code

# 检查安装健康状态
claude doctor
```

## 本地开发方式

### 方式 1: 直接使用 Skills 目录（最简单，推荐）

根据官方文档，Skills 可以直接放在以下位置，**无需插件结构**：

| 位置 | 路径 | 适用范围 |
|------|------|----------|
| 个人 Skills | `~/.claude/skills/<skill-name>/SKILL.md` | 你的所有项目 |
| 项目 Skills | `.claude/skills/<skill-name>/SKILL.md` | 当前项目的所有协作者 |

**示例：创建个人 Skill**
```bash
# 创建目录
mkdir -p ~/.claude/skills/my-skill

# 创建 SKILL.md
cat > ~/.claude/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: 我的自定义 Skill。当用户提到"xxx"时使用。
---

# My Skill

这里是 Skill 的指令内容...
EOF

# 重启 Claude Code 使其生效
claude
```

**示例：创建项目 Skill**
```bash
# 在项目根目录创建
mkdir -p .claude/skills/my-skill

# 创建 SKILL.md（同上）
```

**优点：**
- 最简单的方式，无需任何额外配置
- 个人 Skills 跨所有项目可用
- 项目 Skills 可以提交到 Git 与团队共享

### 方式 2: 使用 --plugin-dir 加载本地插件

如果你正在开发一个插件（包含多个 Skills、Commands、Hooks 等），可以使用 `--plugin-dir` 进行测试。

**重要：必须包含 `.claude-plugin/plugin.json` 文件！**

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # 必需！
└── skills/
    └── my-skill/
        └── SKILL.md
```

**常见错误：** 不要把 `skills/` 目录放在 `.claude-plugin/` 里面！

**plugin.json 示例：**
```json
{
  "name": "my-plugin",
  "description": "我的插件描述",
  "version": "1.0.0"
}
```

**启动方式：**
```bash
# 进入项目目录
cd /path/to/my-plugin

# 使用 --plugin-dir 启动 Claude Code
claude --plugin-dir .

# 或者指定完整路径
claude --plugin-dir /path/to/my-plugin
```

**多插件同时加载：**
```bash
claude --plugin-dir ./plugin-a --plugin-dir ./plugin-b
```

**优点：**
- 无需安装/卸载
- 修改后重启即可生效
- 不影响已安装的其他插件
- 适合开发完整插件

### 方式 3: 安装到本地进行测试

如果需要测试完整的安装流程：

```bash
# 添加本地 marketplace（使用文件路径）
/plugin marketplace add /path/to/claude-code-skills

# 安装插件
/plugin install slides-generator@claude-code-skills

# 启用插件
/plugin enable slides-generator@claude-code-skills
```

**卸载和清理：**
```bash
# 卸载插件
/plugin uninstall slides-generator@claude-code-skills

# 移除 marketplace
/plugin marketplace remove claude-code-skills

# 清理缓存（如遇问题）
rm -rf ~/.claude/plugins/cache
```

## 调试技巧

### 1. 检查安装健康状态

```bash
# 在终端中运行
claude doctor

# 或在 Claude Code 内部运行
/doctor
```

### 2. 查看已加载的 Skills

在 Claude Code 中询问：

```
What Skills are available?
```

或

```
列出所有可用的 Skills
```

Claude 会列出当前加载的所有 Skill 及其描述。

### 3. 使用 Debug 模式

启动 Claude Code 时使用 `--debug` 参数查看详细日志：

```bash
claude --debug

# 配合 --plugin-dir 使用
claude --debug --plugin-dir .
```

这会显示：
- Skill 加载过程
- Skill 匹配过程
- 错误信息

### 4. 测试 Skill 触发

使用 Skill description 中的关键词测试触发：

```
# 如果 description 包含 "做PPT"、"幻灯片"
用户: 帮我做一个 PPT

# Claude 应该提示使用对应的 Skill
```

**Skill 不触发的排查：**
1. 检查 `description` 是否包含用户可能说的关键词
2. 尝试更明确的触发词
3. 检查 SKILL.md 的 YAML frontmatter 格式是否正确

### 5. 检查 SKILL.md 语法

常见的 YAML frontmatter 错误：

```markdown
# ❌ 错误：frontmatter 前有空行

---
name: my-skill
---

# ✅ 正确：frontmatter 必须从第一行开始
---
name: my-skill
description: ...
---
```

```markdown
# ❌ 错误：使用 Tab 缩进
---
name: my-skill
	description: ...   # Tab 缩进
---

# ✅ 正确：使用空格缩进
---
name: my-skill
description: ...
---
```

### 6. 验证文件路径引用

在 SKILL.md 中引用其他文件时，确保路径正确：

```bash
# 检查文件是否存在
ls -la skills/my-skill/references/

# 验证相对路径
cat skills/my-skill/references/example.md
```

### 7. 测试脚本执行

单独测试 scripts/ 中的脚本：

```bash
# 进入 skill 目录
cd skills/slides-generator

# 测试脚本
node scripts/generate.js --help
```

### 8. 清理缓存

如果 Plugin Skills 不显示，尝试清理缓存：

```bash
# 清理插件缓存
rm -rf ~/.claude/plugins/cache

# 重启 Claude Code
claude
```

## 开发工作流

### 推荐流程

```
┌─────────────────────────────────────────────────────────────┐
│  1. 编写/修改 SKILL.md                                       │
├─────────────────────────────────────────────────────────────┤
│  2. 重启 Claude Code（Skills 修改后必须重启才能生效）          │
│     - 个人 Skill: claude                                    │
│     - 插件开发: claude --plugin-dir .                       │
├─────────────────────────────────────────────────────────────┤
│  3. 测试 Skill 触发                                          │
│     > What Skills are available?                            │
│     > <触发关键词>                                           │
├─────────────────────────────────────────────────────────────┤
│  4. 发现问题？退出 Claude Code，修改文件                       │
├─────────────────────────────────────────────────────────────┤
│  5. 重新启动 Claude Code，重复测试                            │
├─────────────────────────────────────────────────────────────┤
│  6. 测试通过后，提交代码                                      │
└─────────────────────────────────────────────────────────────┘
```

**重要提示：** Skills 没有热重载！修改后必须重启 Claude Code 才能生效。

### 快速迭代脚本

创建一个快速测试脚本：

```bash
#!/bin/bash
# dev.sh - 快速启动本地开发环境

echo "Starting Claude Code with local plugins..."
echo "Plugin dir: $(pwd)"
echo ""
echo "Tips:"
echo "  - Ask 'What Skills are available?' to verify loading"
echo "  - Exit and restart to reload changes (no hot reload!)"
echo "  - Use 'claude --debug' for verbose logging"
echo ""

claude --plugin-dir .
```

```bash
chmod +x dev.sh
./dev.sh
```

## 常见问题排查

### Q1: Skill 没有出现在列表中

**可能原因：**
1. SKILL.md 不存在或路径错误
2. YAML frontmatter 格式错误（必须从第一行开始）
3. `name` 字段缺失或格式错误
4. 使用 `--plugin-dir` 但缺少 `.claude-plugin/plugin.json`

**排查步骤：**
```bash
# 检查安装健康状态
claude doctor

# 检查文件存在
ls -la skills/*/SKILL.md

# 检查 frontmatter
head -10 skills/my-skill/SKILL.md

# 使用 debug 模式查看加载错误
claude --debug --plugin-dir .
```

### Q2: Skill 加载了但不触发

**可能原因：**
1. `description` 与用户输入不匹配
2. 其他 Skill 优先级更高

**排查步骤：**
1. 检查 `description` 是否包含触发关键词
2. 尝试更明确的触发语句
3. 在 description 中添加 "Use when..." 明确说明触发条件

### Q3: 引用的文件找不到

**可能原因：**
1. 路径写错（绝对路径 vs 相对路径）
2. 文件名大小写错误（Linux/Mac 区分大小写）

**排查步骤：**
```bash
# 从 SKILL.md 所在目录验证相对路径
cd skills/my-skill
cat references/example.md
```

### Q4: 脚本执行失败

**可能原因：**
1. 缺少执行权限
2. 依赖未安装
3. 路径计算错误

**排查步骤：**
```bash
# 添加执行权限
chmod +x scripts/*.js

# 检查依赖
npm install  # 如果有 package.json

# 单独运行脚本测试
node scripts/generate.js --help
```

### Q5: 修改后不生效

**原因：** Claude Code 在启动时加载 Skills，运行中**不会热更新**。

**解决：** 退出并重新启动 Claude Code。

```bash
# 在 Claude Code 中
/exit

# 重新启动
claude --plugin-dir .
```

### Q6: Plugin Skills 不显示

**原因：** 插件缓存问题或插件结构错误。

**解决：**
```bash
# 1. 清理缓存
rm -rf ~/.claude/plugins/cache

# 2. 检查插件结构（必须包含 .claude-plugin/plugin.json）
ls -la .claude-plugin/plugin.json

# 3. 重启 Claude Code
claude --plugin-dir .
```

## 调试清单

开发新 Skill 时的检查清单：

```
□ SKILL.md 存在且在正确位置
□ YAML frontmatter 从第一行开始（前面不能有空行！）
□ name 字段符合规范（小写+连字符）
□ description 包含触发关键词
□ 相对路径引用正确
□ 脚本有执行权限
□ 使用 claude doctor 检查健康状态
□ 使用 --debug 查看加载日志
□ 测试触发流程
□ 测试完整工作流
□ 如使用 --plugin-dir，确保有 .claude-plugin/plugin.json
```

## 发布前测试

发布到 GitHub 前的完整测试：

```bash
# 1. 清理本地缓存
rm -rf ~/.claude/plugins/cache

# 2. 检查安装健康状态
claude doctor

# 3. 模拟全新安装
claude --plugin-dir /path/to/claude-code-skills

# 4. 验证 Skills 加载
> What Skills are available?

# 5. 测试每个 Skill 的触发
> <Skill 1 触发词>
> <Skill 2 触发词>

# 6. 测试完整工作流
> <完整使用场景>
```

## 参考资源

**项目内文档：**
- [Skill 开发指南](skill-development-guide.md)

**官方文档：**
- [Claude Code Skills 官方文档](https://code.claude.com/docs/en/skills)
- [Claude Code Plugins 官方文档](https://code.claude.com/docs/en/plugins)
- [Claude Code Troubleshooting](https://code.claude.com/docs/en/troubleshooting)
- [Skill 最佳实践指南](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
