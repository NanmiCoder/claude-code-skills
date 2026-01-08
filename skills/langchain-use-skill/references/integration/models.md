# Models

Models are the reasoning engine of agents. LangChain provides a standard model interface across all providers.

## Initialize a Model

### Using init_chat_model

```python
from langchain.chat_models import init_chat_model

# OpenAI
model = init_chat_model("gpt-4o")

# Anthropic
model = init_chat_model("claude-sonnet-4-5-20250929")

# Google Gemini
model = init_chat_model("google_genai:gemini-2.5-flash-lite")

# AWS Bedrock
model = init_chat_model(
    "anthropic.claude-3-5-sonnet-20240620-v1:0",
    model_provider="bedrock_converse",
)
```

### Using Provider Classes

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

model = ChatOpenAI(model="gpt-4o")
model = ChatAnthropic(model="claude-sonnet-4-5-20250929")
```

## Key Methods

```python
# Invoke - returns complete response
response = model.invoke("Why do parrots talk?")

# Stream - returns iterator of chunks
for chunk in model.stream("Tell me a story"):
    print(chunk.text)

# Batch - parallelize multiple requests
responses = model.batch([
    "Question 1?",
    "Question 2?",
])
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `temperature` | Controls randomness (0=deterministic, 1=creative) |
| `max_tokens` | Limits response length |
| `timeout` | Max wait time in seconds |
| `max_retries` | Max retry attempts on failure |

```python
model = init_chat_model(
    "gpt-4o",
    temperature=0.7,
    max_tokens=1000,
    timeout=30,
)
```

## Tool Calling

```python
from langchain.tools import tool
from langchain_core.language_models import bind_tools

@tool
def get_weather(location: str) -> str:
    """Get weather at a location."""
    return f"It's sunny in {location}."

model_with_tools = model.bind_tools([get_weather])
response = model_with_tools.invoke("What's the weather in Boston?")
```

## Structured Output

```python
from pydantic import BaseModel

class Movie(BaseModel):
    title: str
    year: int
    director: str

model_with_structure = model.with_structured_output(Movie)
response = model_with_structure.invoke("Inception by Christopher Nolan from 2010")
```

## Related Topics

- [Agent Basics](agents/agent-basics.md)
- [Structured Output](advanced/structured-output.md)
- [Tool Basics](tools/tool-basics.md)
