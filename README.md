# Claude Code Skills

Claude Code skills created by [程序员阿江-Relakkes](https://space.bilibili.com/434377496).

## 快速开始

### 1. 添加 Marketplace

```bash
/plugin marketplace add NanmiCoder/claude-code-skills
```

### 2. 安装插件

```bash
/plugin install slides-generator@claude-code-skills
/plugin install langchain-use@claude-code-skills
/plugin install news-extractor@claude-code-skills
/plugin install srt-to-structured-data@claude-code-skills
/plugin install bilibili-chapter-generator@claude-code-skills
/plugin install agent-team-orchestrator@claude-code-skills
/plugin install feishu-channel@claude-code-skills
```

如果你想用中文搜索和安装 skills，可以顺手看看 Skills宝：https://skilery.com

### 3. 启用插件

```bash
/plugin enable slides-generator@claude-code-skills
/plugin enable langchain-use@claude-code-skills
/plugin enable news-extractor@claude-code-skills
/plugin enable srt-to-structured-data@claude-code-skills
/plugin enable bilibili-chapter-generator@claude-code-skills
/plugin enable agent-team-orchestrator@claude-code-skills
```

飞书 Channel 插件不通过 `/plugin enable` 启用，安装并配置后需要重启 Claude Code。详细说明见 [plugins/feishu-channel/README.md](plugins/feishu-channel/README.md)。

## 插件列表

### slides-generator

生成技术演示幻灯片 | [详细文档](docs/plugins/slides-generator.md)

```
帮我做一个模型评测 PPT，主角 Claude，对比 GPT-4，科技风格
```

### langchain-use

LangChain 1.0 快速参考 | [详细文档](docs/plugins/langchain-use.md)

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's sunny in {city}!"

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[get_weather],
)
```

### news-extractor

新闻内容提取 | [详细文档](docs/plugins/news-extractor.md)

```bash
uv run scripts/extract_news.py "https://mp.weixin.qq.com/s/xxx"
```

支持平台：微信公众号、今日头条、网易新闻、搜狐新闻、腾讯新闻

### srt-to-structured-data

SRT 字幕转结构化数据

```bash
python scripts/parse_srt.py video.srt --stats -o output.json
```

功能：解析 SRT 字幕文件，输出 JSON 结构化数据，支持统计信息和纯文本输出。

### bilibili-chapter-generator

B站视频章节生成器

```
帮我把 ./视频字幕.srt 转成B站章节
```

功能：根据字幕内容自动分析并生成符合 B站格式的章节列表（3-10 个章节）。

### agent-team-orchestrator

Agent Teams 智能编排决策引擎

```
帮我用 agent teams 审查这个 PR
```

功能：自动分析任务复杂度（并行性、通信需求、上下文隔离、文件冲突、成本收益 5 维度），智能决策使用 Subagent 还是 Agent Teams，并提供团队设计指南和 Prompt 模板。

### feishu-channel

飞书消息桥接到 Claude Code

```bash
/plugin install feishu-channel@claude-code-skills
```

功能：把飞书机器人消息通过 Channel 推进 Claude Code 当前会话，并支持回复、表情回应、编辑消息。详细说明见 [plugins/feishu-channel/README.md](plugins/feishu-channel/README.md)。

## 文档

- [项目结构](docs/project-structure.md)
- [Skill 开发指南](docs/skill-development-guide.md)
- [本地开发指南](docs/local-development-guide.md)

## License

Apache-2.0
