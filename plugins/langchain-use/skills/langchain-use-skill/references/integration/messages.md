# Messages

Messages are the fundamental unit of context for models.

## Message Types

| Type | Description |
|------|-------------|
| `SystemMessage` | Initial instructions that prime model behavior |
| `HumanMessage` | User input and interactions |
| `AIMessage` | Model responses, including tool calls |
| `ToolMessage` | Outputs of tool calls |

## Basic Usage

```python
from langchain.messages import HumanMessage, AIMessage, SystemMessage
from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-5-nano")

# System + Human
messages = [
    SystemMessage("You are a helpful coding assistant."),
    HumanMessage("How do I create a REST API?")
]
response = model.invoke(messages)

# Dictionary format also supported
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
]
response = model.invoke(messages)
```

## Message Content

Messages contain content blocks that can include:
- Text
- Images
- Audio
- Video
- Tool calls
- Tool results

```python
from langchain.messages import HumanMessage, AIMessage

# Text content
msg = HumanMessage("Write a story about a robot.")

# Multimodal content
from langchain_core.messages import ImageMessage

msg = HumanMessage(
    content=[
        {"type": "text", "text": "What's in this image?"},
        {"type": "image", "source_type": "base64", "data": "...", "mime_type": "image/jpeg"}
    ]
)
```

## Related Topics

- [Agent Basics](agents/agent-basics.md)
- [Models](integration/models.md)
