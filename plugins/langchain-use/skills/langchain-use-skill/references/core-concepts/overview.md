# LangChain Overview

> LangChain is an open source framework with a pre-built agent architecture and integrations for any model or tool — so you can build agents that adapt as fast as the ecosystem evolves

LangChain is the easiest way to start building agents and applications powered by LLMs. With under 10 lines of code, you can connect to OpenAI, Anthropic, Google, and more.

## Create an Agent

```python
from langchain.agents import create_agent

def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[get_weather],
    system_prompt="You are a helpful assistant",
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)
```

## Core Benefits

1. **Standard model interface** - Different providers have unique APIs; LangChain standardizes how you interact with models.

2. **Easy to use, highly flexible agent** - Build a simple agent in under 10 lines of code, with flexibility for context engineering.

3. **Built on top of LangGraph** - LangChain's agents are built on top of LangGraph for durable execution, human-in-the-loop support, persistence, and more.

4. **Debug with LangSmith** - Gain deep visibility into complex agent behavior with visualization tools.

## When to Use

- **Use LangChain** to quickly build agents and autonomous applications.
- **Use LangGraph** when you have advanced needs that require a combination of deterministic and agentic workflows, heavy customization, and carefully controlled latency.
