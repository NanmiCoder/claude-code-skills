# Runtime

LangChain's `create_agent` runs on LangGraph's runtime, providing access to context, store, and stream writer.

## Access Runtime Context

When creating an agent, specify a `context_schema` to define the structure:

```python
from dataclasses import dataclass
from langchain.agents import create_agent

@dataclass
class Context:
    user_name: str

agent = create_agent(
    model="gpt-5-nano",
    tools=[...],
    context_schema=Context
)

agent.invoke(
    {"messages": [{"role": "user", "content": "What's my name?"}]},
    context=Context(user_name="John Smith")
)
```

## Inside Tools

Access runtime information inside tools using `ToolRuntime`:

```python
from dataclasses import dataclass
from langchain.tools import tool, ToolRuntime

@dataclass
class Context:
    user_id: str

@tool
def fetch_user_preferences(runtime: ToolRuntime[Context]) -> str:
    """Fetch the user's preferences."""
    user_id = runtime.context.user_id
    preferences = "Brief and polite"
    if runtime.store:
        if memory := runtime.store.get(("users",), user_id):
            preferences = memory.value["preferences"]
    return preferences
```

## Inside Middleware

Access runtime in middleware using `request.runtime`:

```python
from dataclasses import dataclass
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import dynamic_prompt, ModelRequest, before_model
from langgraph.runtime import Runtime

@dataclass
class Context:
    user_name: str

@dynamic_prompt
def dynamic_system_prompt(request: ModelRequest) -> str:
    user_name = request.runtime.context.user_name
    return f"You are a helpful assistant. Address the user as {user_name}."

@before_model
def log_before_model(state: AgentState, runtime: Runtime[Context]) -> dict | None:
    print(f"Processing request for user: {runtime.context.user_name}")
    return None

agent = create_agent(
    model="gpt-5-nano",
    tools=[...],
    middleware=[dynamic_system_prompt, log_before_model],
    context_schema=Context
)
```

## Runtime Object Properties

| Property | Description |
|----------|-------------|
| `context` | Immutable configuration (user_id, session details) |
| `store` | BaseStore instance for long-term memory |
| `stream_writer` | Stream custom updates via "custom" mode |

## Related Topics

- [Tool Basics](tools/tool-basics.md)
- [Long-term Memory](memory/long-term-memory.md)
- [Streaming](advanced/streaming.md)
