# Tool Basics

Tools extend what agents can do—letting them fetch real-time data, execute code, query external databases, and take actions in the world.

## Create Tools

### Basic Tool Definition

```python
from langchain.tools import tool

@tool
def search_database(query: str, limit: int = 10) -> str:
    """Search the customer database for records matching the query.

    Args:
        query: Search terms to look for
        limit: Maximum number of results to return
    """
    return f"Found {limit} results for '{query}'"
```

Type hints are required as they define the tool's input schema. The docstring should be informative.

### Customize Tool Properties

```python
@tool("web_search")  # Custom name
def search(query: str) -> str:
    """Search the web for information."""
    return f"Results for: {query}"

@tool("calculator", description="Performs arithmetic calculations.")
def calc(expression: str) -> str:
    """Evaluate mathematical expressions."""
    return str(eval(expression))
```

### Advanced Schema with Pydantic

```python
from pydantic import BaseModel, Field
from typing import Literal

class WeatherInput(BaseModel):
    """Input for weather queries."""
    location: str = Field(description="City name or coordinates")
    units: Literal["celsius", "fahrenheit"] = Field(default="celsius")
    include_forecast: bool = Field(default=False)

@tool(args_schema=WeatherInput)
def get_weather(location: str, units: str = "celsius", include_forecast: bool = False) -> str:
    """Get current weather and optional forecast."""
    temp = 22 if units == "celsius" else 72
    result = f"Current weather in {location}: {temp} degrees {units[0].upper()}"
    if include_forecast:
        result += "\nNext 5 days: Sunny"
    return result
```

## Reserved Arguments

| Parameter | Purpose |
|-----------|---------|
| `config` | Reserved for passing `RunnableConfig` to tools internally |
| `runtime` | Reserved for `ToolRuntime` parameter |

## ToolRuntime - 访问运行时信息

`ToolRuntime` 提供工具访问运行时信息的统一接口，包括：

- **State** - 可变的执行状态（消息、自定义字段等）
- **Context** - 不可变的配置（用户 ID、会话详情等）
- **Store** - 持久化的长期记忆
- **Stream Writer** - 流式输出自定义更新
- **Config** - 执行的 `RunnableConfig`
- **Tool Call ID** - 当前工具调用的 ID

### 访问 State（状态）

```python
from langchain.tools import tool, ToolRuntime

@tool
def summarize_conversation(runtime: ToolRuntime) -> str:
    """Summarize the conversation so far."""
    messages = runtime.state["messages"]
    return f"Conversation has {len(messages)} messages"

@tool
def get_user_preference(pref_name: str, runtime: ToolRuntime) -> str:
    """Get a user preference value."""
    preferences = runtime.state.get("user_preferences", {})
    return preferences.get(pref_name, "Not set")
```

**注意**: `runtime` 参数对模型隐藏，不会出现在工具 schema 中。

### 更新 State（使用 Command）

```python
from langgraph.types import Command
from langchain.messages import RemoveMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES

@tool
def clear_conversation() -> Command:
    """Clear the conversation history."""
    return Command(
        update={
            "messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES)],
        }
    )

@tool
def update_user_name(new_name: str, runtime: ToolRuntime) -> Command:
    """Update the user's name."""
    return Command(update={"user_name": new_name})
```

### 访问 Context（上下文）

```python
from dataclasses import dataclass
from langchain.tools import tool, ToolRuntime

@dataclass
class UserContext:
    user_id: str

@tool
def get_account_info(runtime: ToolRuntime[UserContext]) -> str:
    """Get the current user's account information."""
    user_id = runtime.context.user_id
    # 使用 user_id 查询数据库
    return f"Account info for user {user_id}"
```

### 访问 Store（长期记忆）

```python
from typing import Any
from langgraph.store.memory import InMemoryStore

@tool
def get_user_info(user_id: str, runtime: ToolRuntime) -> str:
    """Look up user info from long-term memory."""
    store = runtime.store
    user_info = store.get(("users",), user_id)
    return str(user_info.value) if user_info else "Unknown user"

@tool
def save_user_info(user_id: str, user_info: dict[str, Any], runtime: ToolRuntime) -> str:
    """Save user info to long-term memory."""
    store = runtime.store
    store.put(("users",), user_id, user_info)
    return "Successfully saved user info."
```

### 使用 Stream Writer

```python
@tool
def get_weather(city: str, runtime: ToolRuntime) -> str:
    """Get weather for a given city."""
    writer = runtime.stream_writer
    # 在工具执行时流式输出自定义更新
    writer(f"Looking up data for city: {city}")
    writer(f"Acquired data for city: {city}")
    return f"It's always sunny in {city}!"
```

**注意**: 使用 `runtime.stream_writer` 的工具必须在 LangGraph 执行上下文中调用。

## Error Handling

```python
from langchain.agents import create_agent
from langchain.agents.middleware import wrap_tool_call
from langchain.messages import ToolMessage

@wrap_tool_call
def handle_tool_errors(request, handler):
    try:
        return handler(request)
    except Exception as e:
        return ToolMessage(
            content=f"Tool error: Please check your input and try again. ({str(e)})",
            tool_call_id=request.tool_call["id"]
        )

agent = create_agent(
    model="gpt-4o",
    tools=[search, get_weather],
    middleware=[handle_tool_errors]
)
```

## Related Topics

- [ToolRuntime Deep Dive](tools/tool-runtime.md)
- [Agent Basics](agents/agent-basics.md)
