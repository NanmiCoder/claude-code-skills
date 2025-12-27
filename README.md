# Claude Code Skills

Claude Code skills collection by [程序员阿江-Relakkes](https://space.bilibili.com/434377496).

## 安装

### 1. 添加 Marketplace

```bash
/plugin marketplace add NanmiCoder/claude-code-skills
```

### 2. 安装 Plugin

```bash
/plugin install slides-generator@claude-code-skills
```

### 3. 启用 Plugin

安装后插件默认为禁用状态，需要手动启用：

```bash
/plugin enable slides-generator@claude-code-skills
```

或在 `/plugin` 界面的 Installed 标签页中选择 "Enable plugin"。

### 4. 重启 Claude Code（可选）

如果启用后仍无法使用，尝试重启 Claude Code。

## 项目结构

```
claude-code-skills/
├── .claude-plugin/
│   └── marketplace.json          # Marketplace 配置
├── skills/
│   └── slides-generator/         # 幻灯片生成器 Skill
│       ├── SKILL.md              # Skill 定义
│       ├── references/           # 参考文档
│       │   ├── palettes.md       # 76个配色方案
│       │   ├── examples/         # 使用示例
│       │   └── schemas/          # 数据结构定义
│       ├── scripts/              # 工具脚本
│       │   └── generate.js
│       └── assets/
│           └── template/         # React 模板项目
├── docs/
│   └── plans/                    # 设计文档
├── README.md
└── LICENSE
```

## 包含的 Skills

### slides-generator

自动生成技术演示幻灯片项目。用于创建 LLM 模型评测、技术产品演示、技术报告等场景的交互式幻灯片。

**触发关键词**: "做评测"、"做演示"、"做PPT"、"展示"、"幻灯片"

**支持场景**:
- LLM 模型能力评测
- 技术产品功能演示
- 技术报告与分析
- 工具/框架对比评测

**内置主题** (76个配色方案):

| 风格 | 主题ID | 主色 |
|------|--------|------|
| 科技蓝 | tech-blue | #0ea5e9 |
| 深蓝专业 | blue-professional | #2563eb |
| 红色活力 | red-vibrant | #de283b |
| 绿色自然 | green-nature | #10a37f |
| 紫色优雅 | purple-elegant | #7c3aed |
| 赛博朋克 | cyberpunk | #0f0f0f |
| 金色奢华 | gold-luxury | #1e1e1e |
| 中国朱红 | vermilion-chinese | #efd8bb |
| ... | 更多主题见 references/palettes.md | ... |

**使用示例**:

```
用户: 帮我做一个模型工程能力评测

Claude: "好的，我来帮你创建评测 PPT。请告诉我：
  1. 主角模型是什么？
  2. 对比哪些模型？
  3. 您想要什么风格？科技感/专业/活力..."

用户: "主角 Model A，对比 Model B 和 C，专业风格"

Claude: "推荐 blue-professional 主题，有几个评测任务？"

... 继续交互式收集信息 ...

Claude: [展示大纲] "确认开始生成吗？"

用户: "确认"

Claude: [生成项目]
```

Claude 会通过交互式问答：
1. 识别场景类型（LLM 评测）
2. 收集必要信息（对比模型、任务详情等）
3. 展示 PPT 大纲让用户确认
4. 确认后生成完整的 Vite + React + Tailwind 项目
5. 启动开发服务器预览

## 技术栈

生成的幻灯片项目使用：
- Vite
- React 18
- Tailwind CSS
- Lucide React Icons
- JetBrains Mono Font

## 开发新 Skill

想要贡献新的 Skill？请参阅以下文档：

- [Skill 开发指南](docs/skill-development-guide.md) - 目录结构、SKILL.md 编写、最佳实践
- [本地开发调试指南](docs/local-development-guide.md) - 本地测试、调试技巧、问题排查

## License

Apache-2.0
