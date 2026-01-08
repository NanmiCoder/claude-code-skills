# Streaming

LangChain implements a streaming system to surface real-time updates.

## Supported Stream Modes

| Mode | Description |
|------|-------------|
| `updates` | Streams state updates after each agent step |
| `messages` | Streams tuples of (token, metadata) from LLM invocations |
| `custom` | Streams custom data from inside graph nodes |

## Agent Progress

Stream agent progress with `stream_mode="updates"`:

```python
for chunk in agent.stream(
    {"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
    stream_mode="updates",
):
    for step, data in chunk.items():
        print(f"step: {step}")
        print(f"content: {data['messages'][-1].content_blocks}")
```

## LLM Tokens

Stream tokens as they are produced with `stream_mode="messages"`:

```python
for token, metadata in agent.stream(
    {"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
    stream_mode="messages",
):
    print(f"node: {metadata['langgraph_node']}")
    print(f"content: {token.content_blocks}")
```

## Custom Updates

Stream custom updates from tools:

```python
from langgraph.config import get_stream_writer

@tool
def get_weather(city: str) -> str:
    """Get weather for a given city."""
    writer = get_stream_writer()
    writer(f"Looking up data for city: {city}")
    writer(f"Acquired data for city: {city}")
    return f"It's always sunny in {city}!"

for chunk in agent.stream(
    {"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
    stream_mode="custom"
):
    print(chunk)
```

## Stream Multiple Modes

```python
for stream_mode, chunk in agent.stream(
    {"messages": [{"role": "user", "content": "What is the weather in SF?"}]},
    stream_mode=["updates", "custom"]
):
    print(f"stream_mode: {stream_mode}")
    print(f"content: {chunk}")
```

## Disable Streaming

```python
from langchain_openai import ChatOpenAI

model = ChatOpenAI(
    model="gpt-4o",
    streaming=False  # Disable streaming for this model
)
```

## Related Topics

- [Tool Basics](tools/tool-basics.md)
- [Agent Basics](agents/agent-basics.md)
