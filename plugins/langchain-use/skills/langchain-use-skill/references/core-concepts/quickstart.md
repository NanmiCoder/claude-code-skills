# Quickstart Guide

Build a basic agent in just a few minutes.

## Requirements

- Install LangChain package (`uv add langchain`)
- Set up a Claude (Anthropic) account and get an API key (`uv add langchain-anthropic`)
- Set the `ANTHROPIC_API_KEY` environment variable

## Basic Agent

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

# Run the agent
result = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)
```

## Production Agent

A production-ready agent demonstrates:

1. **Detailed system prompts** for better agent behavior
2. **Create tools** that integrate with external data
3. **Model configuration** for consistent responses
4. **Structured output** for predictable results
5. **Conversational memory** for chat-like interactions
6. **Runtime context** for user-specific information

### Complete Example

```python
from dataclasses import dataclass
from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain.tools import tool, ToolRuntime
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.structured_output import ToolStrategy

# Step 1: Define system prompt
SYSTEM_PROMPT = """You are an expert weather forecaster, who speaks in puns.

You have access to two tools:
- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can
tell from the question that they mean wherever they are, use the get_user_location
tool to find their location."""

# Step 2: Create tools
@tool
def get_weather_for_location(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

@dataclass
class Context:
    """Custom runtime context schema."""
    user_id: str

@tool
def get_user_location(runtime: ToolRuntime[Context]) -> str:
    """Retrieve user information based on user ID."""
    user_id = runtime.context.user_id
    return "Florida" if user_id == "1" else "SF"

# Step 3: Configure model
model = init_chat_model(
    "claude-sonnet-4-5-20250929",
    temperature=0.5,
    timeout=10,
    max_tokens=1000
)

# Step 4: Define response format (optional)
@dataclass
class ResponseFormat:
    """Response schema for the agent."""
    # A punny response (always required)
    punny_response: str
    # Any interesting information about the weather if available
    weather_conditions: str | None = None

# Step 5: Add memory
checkpointer = InMemorySaver()

# Step 6: Create and run the agent
agent = create_agent(
    model=model,
    system_prompt=SYSTEM_PROMPT,
    tools=[get_user_location, get_weather_for_location],
    context_schema=Context,
    response_format=ToolStrategy(ResponseFormat),
    checkpointer=checkpointer
)

# thread_id is a unique identifier for a given conversation
config = {"configurable": {"thread_id": "1"}}
response = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather outside?"}]},
    config=config,
    context=Context(user_id="1")
)
print(response['structured_response'])
# ResponseFormat(
#   punny_response="Florida is still having a 'sun-derful' day!...",
#   weather_conditions="It's always sunny in Florida!"
# )

# Continue the conversation using the same thread_id
response = agent.invoke(
    {"messages": [{"role": "user", "content": "thank you!"}]},
    config=config,
    context=Context(user_id="1")
)
```

## What You Get

After completing this quickstart, you have an AI agent that can:

- **Understand context** and remember conversations
- **Use multiple tools** intelligently
- **Provide structured responses** in a consistent format
- **Handle user-specific information** through context
- **Maintain conversation state** across interactions
