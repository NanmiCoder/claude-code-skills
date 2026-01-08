# Agent Basics

Agents combine language models with tools to create systems that can reason about tasks, decide which tools to use, and iteratively work towards solutions.

## Core Components

### Model

The model is the reasoning engine of your agent. Can be specified as a string identifier or a model instance.

```python
# Static model (most common)
from langchain.agents import create_agent

agent = create_agent("openai:gpt-5", tools=tools)
```

**Dynamic model selection:**

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse

basic_model = ChatOpenAI(model="gpt-4o-mini")
advanced_model = ChatOpenAI(model="gpt-4o")

@wrap_model_call
def dynamic_model_selection(request: ModelRequest, handler) -> ModelResponse:
    message_count = len(request.state["messages"])
    model = advanced_model if message_count > 10 else basic_model
    return handler(request.override(model=model))

agent = create_agent(
    model=basic_model,
    tools=tools,
    middleware=[dynamic_model_selection]
)
```

### Tools

Tools give agents the ability to take actions.

```python
from langchain.tools import tool
from langchain.agents import create_agent

@tool
def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

@tool
def get_weather(location: str) -> str:
    """Get weather information for a location."""
    return f"Weather in {location}: Sunny, 72°F"

agent = create_agent(model, tools=[search, get_weather])
```

### System Prompt

```python
agent = create_agent(
    model,
    tools,
    system_prompt="You are a helpful assistant. Be concise and accurate."
)
```

## Invocation

```python
result = agent.invoke(
    {"messages": [{"role": "user", "content": "What's the weather in San Francisco?"}]}
)
```

## ReAct Loop Pattern

Agents follow the ReAct ("Reasoning + Acting") pattern:

```
Query -> Model -> Tool -> Observation -> Model -> Final Answer
```

## Related Topics

- [Tool Basics](tools/tool-basics.md)
- [Short-term Memory](memory/short-term-memory.md)
- [Structured Output](advanced/structured-output.md)
