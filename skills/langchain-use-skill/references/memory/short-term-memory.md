# Short-term Memory（短期记忆）

Short-term memory 让你的应用能够在单个 thread（会话线程）或对话中记住之前的交互。

## Overview

Memory 是一个记住之前交互信息的系统。对于 AI agents 来说，memory 至关重要：
- 记住之前的交互
- 从反馈中学习
- 适应用户偏好

**Thread（线程）** 组织一个会话中的多个交互，类似于电子邮件中的对话线程。

Conversation history（对话历史）是最常见的短期记忆形式。长对话会带来挑战：
- 完整历史可能超出 LLM 的 context window
- 即使支持长上下文，LLM 在长文本中表现也会下降
- 响应变慢，成本增加

## 使用 Short-term Memory

要为 agent 添加短期记忆（线程级持久化），需要在创建 agent 时指定 `checkpointer`：

```python
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver

agent = create_agent(
    "claude-sonnet-4-5-20250929",
    tools=[get_user_info],
    checkpointer=InMemorySaver(),  # 添加内存检查点
)

# 使用 thread_id 标识会话
config = {"configurable": {"thread_id": "1"}}

agent.invoke(
    {"messages": [{"role": "user", "content": "Hi! My name is Bob."}]},
    config,
)

# 在同一会话中继续对话
agent.invoke(
    {"messages": [{"role": "user", "content": "What's my name?"}]},
    config,
)
# Agent 会回答: "Your name is Bob."
```

### 生产环境使用数据库

在生产环境中，使用数据库支持的 checkpointer：

```bash
# 安装 PostgreSQL checkpointer
pip install langgraph-checkpoint-postgres
# 或使用 uv
uv add langgraph-checkpoint-postgres
```

```python
from langchain.agents import create_agent
from langgraph.checkpoint.postgres import PostgresSaver

DB_URI = "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable"

with PostgresSaver.from_conn_string(DB_URI) as checkpointer:
    checkpointer.setup()  # 自动在 PostgreSQL 中创建表

    agent = create_agent(
        "claude-sonnet-4-5-20250929",
        tools=[get_user_info],
        checkpointer=checkpointer,
    )

    # 使用 agent...
```

## Custom State Schema

```python
from langchain.agents import create_agent, AgentState

class CustomAgentState(AgentState):
    user_id: str
    preferences: dict

agent = create_agent(
    "gpt-5",
    tools=[get_user_info],
    state_schema=CustomAgentState,
    checkpointer=InMemorySaver(),
)
```

## Common Patterns

### Trim Messages

Remove oldest messages to fit context window:

```python
from langchain.messages import RemoveMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import before_model
from langgraph.runtime import Runtime
from typing import Any

@before_model
def trim_messages(state: AgentState, runtime: Runtime) -> dict[str, Any] | None:
    """Keep only the last few messages to fit context window."""
    messages = state["messages"]
    if len(messages) <= 3:
        return None
    first_msg = messages[0]
    recent_messages = messages[-3:] if len(messages) % 2 == 0 else messages[-4:]
    return {
        "messages": [RemoveMessage(id=REMOVE_ALL_MESSAGES), first_msg, *recent_messages]
    }

agent = create_agent(
    model,
    tools=tools,
    middleware=[trim_messages],
    checkpointer=InMemorySaver(),
)
```

### Summarize Messages

```python
from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[],
    middleware=[
        SummarizationMiddleware(
            model="gpt-4o-mini",
            trigger=("tokens", 4000),
            keep=("messages", 20)
        )
    ],
    checkpointer=InMemorySaver(),
)
```

### Delete Messages

```python
@after_model
def delete_old_messages(state: AgentState, runtime: Runtime) -> dict | None:
    """Remove old messages to keep conversation manageable."""
    messages = state["messages"]
    if len(messages) > 2:
        return {"messages": [RemoveMessage(id=m.id) for m in messages[:2]]}
    return None
```

## Access Memory in Tools

```python
@tool
def get_user_info(runtime: ToolRuntime) -> str:
    """Look up user info."""
    user_id = runtime.state["user_id"]
    return "User is John Smith" if user_id == "user_123" else "Unknown user"
```

## Related Topics

- [Long-term Memory](memory/long-term-memory.md)
- [Middleware Overview](middleware/middleware-overview.md)
