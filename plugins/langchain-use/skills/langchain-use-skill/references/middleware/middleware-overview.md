# Middleware Overview

Middleware provides a way to control and customize agent execution at every step. Middleware is useful for:

- Tracking agent behavior with logging, analytics, and debugging
- Transforming prompts, tool selection, and output formatting
- Adding retries, fallbacks, and early termination logic
- Applying rate limits, guardrails, and PII detection

## The Agent Loop

The core agent loop involves calling a model, letting it choose tools to execute, and finishing when it calls no more tools.

Middleware exposes hooks before and after each of those steps:

- `@before_model` - Process state before model is called
- `@after_model` - Modify or validate model's response
- `@wrap_tool_call` - Handle tool execution
- `@dynamic_prompt` - Generate system prompts dynamically

## Usage

```python
from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware, HumanInTheLoopMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[...],
    middleware=[
        SummarizationMiddleware(...),
        HumanInTheLoopMiddleware(...)
    ],
)
```

## Built-in Middleware

| Middleware | Purpose |
|------------|---------|
| `SummarizationMiddleware` | Auto-summarize conversation when nearing token limits |
| `HumanInTheLoopMiddleware` | Pause for human approval of tool calls |
| `ModelCallLimitMiddleware` | Limit model calls to prevent costs |
| `ToolCallLimitMiddleware` | Limit tool execution counts |
| `ModelFallbackMiddleware` | Fallback to alternative models on failure |
| `PIIMiddleware` | Detect and handle PII |
| `TodoListMiddleware` | Task planning and tracking |
| `LLMToolSelectorMiddleware` | LLM-based tool selection |
| `ToolRetryMiddleware` | Retry failed tool calls |

## Custom Middleware Decorators

### Before Model

```python
from langchain.agents.middleware import before_model, AgentState
from langgraph.runtime import Runtime

@before_model
def log_before_model(state: AgentState, runtime: Runtime) -> dict | None:
    print(f"About to call model with {len(state['messages'])} messages")
    return None
```

### After Model

```python
from langchain.agents.middleware import after_model, AgentState

@after_model
def log_response(state: AgentState, runtime: Runtime) -> dict | None:
    print(f"Model returned: {state['messages'][-1].content}")
    return None
```

### Wrap Model Call

```python
from langchain.agents.middleware import wrap_model_call, ModelRequest, ModelResponse
from typing import Callable

@wrap_model_call
def retry_model(request: ModelRequest, handler: Callable) -> ModelResponse:
    for attempt in range(3):
        try:
            return handler(request)
        except Exception as e:
            if attempt == 2:
                raise
            print(f"Retry {attempt + 1}/3 after error: {e}")
```

### Dynamic System Prompt

```python
from langchain.agents.middleware import dynamic_prompt, ModelRequest

@dynamic_prompt
def user_role_prompt(request: ModelRequest) -> str:
    user_role = request.runtime.context.get("user_role", "user")
    base_prompt = "You are a helpful assistant."
    if user_role == "expert":
        return f"{base_prompt} Provide detailed technical responses."
    return base_prompt

agent = create_agent(
    model="gpt-4o",
    tools=[web_search],
    middleware=[user_role_prompt],
)
```

## Related Topics

- [Short-term Memory](memory/short-term-memory.md)
- [Guardrails](advanced/guardrails.md)
