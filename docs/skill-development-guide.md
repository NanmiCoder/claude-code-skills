# Skill 开发指南

本文档总结了在 `claude-code-skills` 项目中创建新 Skill 的标准流程和最佳实践。

## 目录结构规范

### 项目整体结构

```
claude-code-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace 配置（需更新）
├── skills/
│   ├── slides-generator/         # 现有 Skill
│   └── <new-skill>/              # 新 Skill 目录
├── docs/
├── README.md                     # 需更新 Skill 列表
└── LICENSE
```

### 单个 Skill 目录结构

```
<skill-name>/
├── SKILL.md                      # [必需] Skill 定义文件
├── references/                   # [可选] 参考文档（Claude 按需读取）
│   ├── <topic>.md
│   └── examples/
├── scripts/                      # [可选] 可执行脚本（运行但不加载到上下文）
│   └── <script>.js|py|sh
└── assets/                       # [可选] 资源文件（用于输出，不加载到上下文）
    └── <resource>/
```

## 创建新 Skill 的步骤

### Step 1: 创建目录结构

```bash
# 创建 skill 目录
mkdir -p skills/<skill-name>

# 根据需要创建子目录
mkdir -p skills/<skill-name>/references
mkdir -p skills/<skill-name>/scripts
mkdir -p skills/<skill-name>/assets
```

### Step 2: 编写 SKILL.md

SKILL.md 是唯一必需的文件，包含 YAML frontmatter 和 Markdown 内容。

```markdown
---
name: <skill-name>
description: <清晰描述 Skill 做什么以及何时使用，包含触发关键词>
---

# Skill 标题

## 角色定义
描述 Claude 在使用此 Skill 时的角色...

## 工作流程
定义标准工作流程...

## 使用示例
提供具体示例...
```

#### YAML Frontmatter 字段

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | ✅ | 唯一标识符，必须小写+连字符，与目录名一致，最长64字符 |
| `description` | ✅ | 描述做什么、何时使用，包含触发关键词，最长1024字符 |
| `allowed-tools` | ❌ | 限制可用工具列表（如 `Read, Grep, Glob`） |
| `model` | ❌ | 指定使用的模型（如 `claude-sonnet-4-20250514`） |

#### Description 编写要点

**好的 description：**
```
description: 自动生成技术演示幻灯片项目。用于创建 LLM 模型评测、技术产品演示、技术报告等场景的交互式幻灯片。当用户提到"做评测"、"做演示"、"做PPT"、"展示"、"幻灯片"等关键词时自动激活。
```

**不好的 description：**
```
description: 帮助处理文档
```

原因：description 需要包含：
1. **做什么** - 具体功能描述
2. **何时用** - 适用场景
3. **触发词** - 用户可能说的关键词

### Step 3: 组织参考文档 (references/)

将 Claude 需要按需读取的文档放在 `references/` 目录。

```
references/
├── api-reference.md      # API 文档
├── examples/             # 使用示例
│   ├── example-1.md
│   └── example-2.md
└── schemas/              # 数据结构定义
    └── data.schema.md
```

**在 SKILL.md 中引用：**
```markdown
详见 [API 参考](references/api-reference.md)。
更多示例见 [references/examples/](references/examples/)。
```

### Step 4: 添加脚本 (scripts/)

将可执行脚本放在 `scripts/` 目录。这些脚本会被执行，但不会加载到上下文。

```javascript
// scripts/generate.js
#!/usr/bin/env node

// 脚本逻辑...
```

**在 SKILL.md 中引用：**
```markdown
运行生成脚本：
\`\`\`bash
node scripts/generate.js <参数>
\`\`\`
```

### Step 5: 添加资源文件 (assets/)

将模板、图片等资源放在 `assets/` 目录。这些文件用于输出，不会加载到上下文。

```
assets/
├── template/             # 项目模板
│   ├── package.json
│   └── src/
└── images/               # 图片资源
```

### Step 6: 更新 marketplace.json

在 `.claude-plugin/marketplace.json` 的 `skills` 数组中添加新 Skill：

```json
{
  "plugins": [
    {
      "name": "slides-generator",
      "description": "...",
      "source": "./",
      "strict": false,
      "skills": [
        "./skills/slides-generator",
        "./skills/<new-skill>"       // 添加新 Skill
      ]
    }
  ]
}
```

### Step 7: 更新 README.md

在项目 README 中添加新 Skill 的说明。

### Step 8: 测试 Skill

```bash
# 使用 --plugin-dir 本地测试
claude --plugin-dir /path/to/claude-code-skills

# 在 Claude Code 中测试
> What Skills are available?
> <触发 Skill 的提示词>
```

## 最佳实践

### 1. SKILL.md 保持精简

- 控制在 **500 行以内**
- 核心指令放在 SKILL.md
- 详细参考资料放在 `references/`

### 2. 渐进式披露 (Progressive Disclosure)

```
Level 1: name + description     → 始终在上下文中
Level 2: SKILL.md 正文          → Skill 触发后加载
Level 3: references/ 文件       → Claude 按需读取
```

### 3. 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| Skill 名称 | 小写+连字符 | `slides-generator` |
| 目录名 | 与 Skill 名称一致 | `skills/slides-generator/` |
| 文件名 | 小写+连字符 | `api-reference.md` |

### 4. 路径引用

在 SKILL.md 中使用**相对路径**引用文件：

```markdown
# 正确
详见 [references/palettes.md](references/palettes.md)

# 错误
详见 [/Users/xxx/skills/.../palettes.md](...)
```

### 5. 脚本设计

- 脚本应该**自包含**，不依赖外部状态
- 使用 `__dirname` 获取脚本位置，计算相对路径
- 提供 `--help` 参数说明用法

```javascript
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = path.resolve(__dirname, '..', 'assets', 'template');
```

### 6. 工作流程设计

好的 Skill 应该定义清晰的工作流程：

```markdown
## 工作流程

Step 1: 场景识别 → Step 2: 信息收集 → Step 3: 确认 → Step 4: 执行

### Step 1: 场景识别
...

### Step 2: 信息收集
...
```

### 7. 提供示例

在 `references/examples/` 中提供完整示例，帮助 Claude 理解预期输出。

## Skill 类型参考

### 类型 1: 纯指导型

只有 SKILL.md，提供工作指南和最佳实践。

```
my-skill/
└── SKILL.md
```

适用于：代码审查、文档编写规范等。

### 类型 2: 带参考文档

包含参考文档供 Claude 按需查阅。

```
my-skill/
├── SKILL.md
└── references/
    └── api-docs.md
```

适用于：API 集成、特定框架使用等。

### 类型 3: 带脚本执行

包含可执行脚本完成特定任务。

```
my-skill/
├── SKILL.md
└── scripts/
    └── process.py
```

适用于：数据处理、验证检查等。

### 类型 4: 完整项目生成

包含模板资源用于生成完整项目。

```
my-skill/
├── SKILL.md
├── references/
├── scripts/
└── assets/
    └── template/
```

适用于：项目脚手架、代码生成等（如 slides-generator）。

## Checklist

创建新 Skill 前，确认以下事项：

- [ ] Skill 名称唯一且符合命名规范（小写+连字符）
- [ ] 目录名与 SKILL.md 中的 `name` 字段一致
- [ ] `description` 包含功能描述、适用场景和触发关键词
- [ ] SKILL.md 控制在 500 行以内
- [ ] 详细文档放在 `references/` 目录
- [ ] 脚本放在 `scripts/` 目录且可独立执行
- [ ] 资源文件放在 `assets/` 目录
- [ ] 所有路径引用使用相对路径
- [ ] 已更新 `marketplace.json`
- [ ] 已更新 `README.md`
- [ ] 本地测试通过

## 参考资源

**项目内文档：**
- [本地开发调试指南](local-development-guide.md) - 本地测试、调试技巧、问题排查

**官方文档：**
- [Claude Code Skills 官方文档](https://code.claude.com/docs/en/skills)
- [Claude Code Plugins 官方文档](https://code.claude.com/docs/en/plugins)
- [anthropics/skills 仓库](https://github.com/anthropics/skills)
- [Skill 最佳实践指南](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
