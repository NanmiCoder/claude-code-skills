# Structured Output

Structured output allows agents to return data in a specific, predictable format using Pydantic models, dataclasses, or TypedDict.

## Response Format

Use `response_format` to control structured output:

- `ProviderStrategy[Schema]` - Uses provider-native structured output
- `ToolStrategy[Schema]` - Uses tool calling for structured output
- `type[Schema]` - Auto-selects best strategy based on model capabilities

## Provider Strategy

Uses native structured output from providers (OpenAI, Anthropic, xAI, Gemini):

```python
from pydantic import BaseModel, Field
from langchain.agents import create_agent

class ContactInfo(BaseModel):
    """Contact information for a person."""
    name: str = Field(description="The name of the person")
    email: str = Field(description="The email address of the person")
    phone: str = Field(description="The phone number of the person")

agent = create_agent(
    model="gpt-5",
    response_format=ContactInfo  # Auto-selects ProviderStrategy
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567"}]
})

print(result["structured_response"])
# ContactInfo(name='John Doe', email='john@example.com', phone='(555) 123-4567')
```

## Tool Strategy

For models that don't support native structured output:

```python
from pydantic import BaseModel, Field
from typing import Literal
from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy

class ProductReview(BaseModel):
    """Analysis of a product review."""
    rating: int | None = Field(description="Rating 1-5", ge=1, le=5)
    sentiment: Literal["positive", "negative"] = Field(description="Sentiment")
    key_points: list[str] = Field(description="Key points")

agent = create_agent(
    model="gpt-5",
    tools=tools,
    response_format=ToolStrategy(ProductReview)
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "Analyze: Great product, 5 stars!"}]
})
```

## Supported Schema Types

- **Pydantic models** - Returns validated Pydantic instance
- **Dataclasses** - Returns dict
- **TypedDict** - Returns dict
- **JSON Schema** - Returns dict

## Error Handling

```python
ToolStrategy(
    schema=ProductRating,
    handle_errors=True  # Default: retry on validation errors
)

# Custom error message
ToolStrategy(
    schema=ProductRating,
    handle_errors="Please provide a valid rating between 1-5."
)

# Handle specific exceptions
ToolStrategy(
    schema=ProductRating,
    handle_errors=(ValueError, TypeError)
)

# No error handling
ToolStrategy(
    schema=ProductRating,
    handle_errors=False
)
```

## Related Topics

- [Agent Basics](agents/agent-basics.md)
- [Models](integration/models.md)
