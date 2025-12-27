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

### 3. 重启 Claude Code

安装完成后重启 Claude Code 即可使用。

## 包含的 Skills

### slides-generator

自动生成技术演示幻灯片项目。用于创建 LLM 模型评测、技术产品演示、技术报告等场景的交互式幻灯片。

**触发关键词**: "做评测"、"做演示"、"做PPT"、"展示"、"幻灯片"

**支持场景**:
- LLM 模型能力评测
- 技术产品功能演示
- 技术报告与分析
- 工具/框架对比评测

**内置主题**:
| 模型/产品 | 主题 | 主色 |
|-----------|------|------|
| MiniMax / M2.1 | minimax | 红色 #de283b |
| DeepSeek | deepseek | 蓝色 #2563eb |
| Claude / Anthropic | claude | 橙色 #d97706 |
| GPT / OpenAI | openai | 绿色 #10a37f |
| Kimi / Moonshot | moonshot | 紫色 #7c3aed |
| 通用 | tech-blue | 天蓝 #0ea5e9 |

**使用示例**:

```
用户: 帮我做一个 DeepSeek V3 的工程能力评测

Claude: "好的，我来帮你创建评测 PPT。请确认以下信息：
  1. 主角模型：DeepSeek V3 ✓
  2. 对比模型有哪些？
  3. 推荐使用 deepseek 蓝色主题，可以吗？"

用户: "对比 Claude 3.5 和 GPT-4，主题 OK"

Claude: "有几个评测任务？分别是什么？"

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

## License

Apache-2.0
