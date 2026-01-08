# Long-term Memory

LangGraph stores long-term memories as JSON documents in a store. Each memory is organized under a custom namespace (like a folder) and a distinct key (like a filename).

## Memory Storage

```python
from langgraph.store.memory import InMemoryStore

def embed(texts: list[str]) -> list[list[float]]:
    # Replace with an actual embedding function
    return [[1.0, 2.0] * len(texts)]

store = InMemoryStore(index={"embed": embed, "dims": 2})
namespace = ("user_id", "application_context")
store.put(namespace, "memory_key", {"data": "value"})
```

## Read Long-term Memory in Tools

```python
from dataclasses import dataclass
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime
from langgraph.store.memory import InMemoryStore

@dataclass
class Context:
    user_id: str

store = InMemoryStore()

@tool
def get_user_info(runtime: ToolRuntime[Context]) -> str:
    """Look up user info."""
    store = runtime.store
    user_id = runtime.context.user_id
    user_info = store.get(("users",), user_id)
    return str(user_info.value) if user_info else "Unknown user"

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[get_user_info],
    store=store,
    context_schema=Context
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "look up user information"}]},
    context=Context(user_id="user_123")
)
```

## Write Long-term Memory from Tools

```python
from dataclasses import dataclass
from typing_extensions import TypedDict
from langchain.agents import create_agent
from langchain.tools import tool, ToolRuntime
from langgraph.store.memory import InMemoryStore

store = InMemoryStore()

@dataclass
class Context:
    user_id: str

class UserInfo(TypedDict):
    name: str
    email: str

@tool
def save_user_info(user_info: UserInfo, runtime: ToolRuntime[Context]) -> str:
    """Save user info."""
    store = runtime.store
    user_id = runtime.context.user_id
    store.put(("users",), user_id, user_info)
    return "Successfully saved user info."

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[save_user_info],
    store=store,
    context_schema=Context
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "My name is John Smith"}]},
    context=Context(user_id="user_123")
)
```

## Namespace Structure

- Namespace: `(user_id, context)` - groups related data
- Key: unique identifier within namespace
- Value: JSON-serializable data

## Related Topics

- [Short-term Memory](memory/short-term-memory.md)
- [Tool Basics](tools/tool-basics.md)
