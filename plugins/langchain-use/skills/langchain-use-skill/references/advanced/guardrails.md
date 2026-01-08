# Guardrails

Guardrails help build safe, compliant AI applications by validating and filtering content.

## Overview

Guardrails can detect sensitive information, enforce content policies, validate outputs, and prevent unsafe behaviors.

You can implement guardrails using middleware to intercept execution at strategic points.

## Built-in Guardrails

### PII Detection

```python
from langchain.agents import create_agent
from langchain.agents.middleware import PIIMiddleware

agent = create_agent(
    model="gpt-4o",
    tools=[customer_service_tool, email_tool],
    middleware=[
        # Redact emails in user input
        PIIMiddleware(
            "email",
            strategy="redact",
            apply_to_input=True,
        ),
        # Mask credit cards
        PIIMiddleware(
            "credit_card",
            strategy="mask",
            apply_to_input=True,
        ),
        # Block API keys
        PIIMiddleware(
            "api_key",
            detector=r"sk-[a-zA-Z0-9]{32}",
            strategy="block",
            apply_to_input=True,
        ),
    ],
)
```

**PII Strategies:**

| Strategy | Description | Example |
|----------|-------------|---------|
| `redact` | Replace with `[REDACTED_TYPE]` | `[REDACTED_EMAIL]` |
| `mask` | Partially obscure | `****-****-****-1234` |
| `hash` | Replace with hash | `a8f5f167...` |
| `block` | Raise exception | Error thrown |

## Custom Guardrails

### Deterministic Guardrail

```python
from langchain.agents import create_agent, AgentState
from langchain.agents.middleware import before_model
from langgraph.runtime import Runtime

FORBIDDEN_WORDS = ["password", "secret", "api_key"]

@before_model
def check_input(state: AgentState, runtime: Runtime) -> dict | None:
    last_message = state["messages"][-1]
    content = last_message.content if hasattr(last_message, 'content') else str(last_message)
    for word in FORBIDDEN_WORDS:
        if word in content.lower():
            raise ValueError(f"Input contains forbidden word: {word}")
    return None
```

### Model-based Guardrail

```python
from langchain.agents.middleware import after_agent, AgentState
from langgraph.runtime import Runtime
from langchain.messages import AIMessage
from langchain.chat_models import init_chat_model
from langgraph.config import get_stream_writer

safety_model = init_chat_model("openai:gpt-4o-mini")

@after_agent(can_jump_to=["end"])
def safety_guardrail(state: AgentState, runtime: Runtime) -> dict | None:
    """Use an LLM to evaluate response safety."""
    stream_writer = get_stream_writer()
    if not state["messages"]:
        return None

    last_message = state["messages"][-1]
    if not isinstance(last_message, AIMessage):
        return None

    # Evaluate safety
    # ... safety evaluation logic ...

    return None
```

## Common Use Cases

- Preventing PII leakage
- Detecting and blocking prompt injection attacks
- Blocking inappropriate or harmful content
- Enforcing business rules and compliance
- Validating output quality

## Related Topics

- [Middleware Overview](middleware/middleware-overview.md)
- [Short-term Memory](memory/short-term-memory.md)
