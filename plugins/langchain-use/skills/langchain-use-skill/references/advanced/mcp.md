# Model Context Protocol (MCP)

[MCP](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide tools and context to LLMs.

## Quickstart

Install the library:

```bash
pip install langchain-mcp-adapters
```

## Usage

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent

client = MultiServerMCPClient({
    "math": {
        "transport": "stdio",
        "command": "python",
        "args": ["/path/to/math_server.py"],
    },
    "weather": {
        "transport": "http",
        "url": "http://localhost:8000/mcp",
    }
})

tools = await client.get_tools()
agent = create_agent(
    "claude-sonnet-4-5-20250929",
    tools
)

math_response = await agent.ainvoke(
    {"messages": [{"role": "user", "content": "what's (3 + 5) x 12?"}]}
)
```

## Transport Types

### STDIO (Local Subprocess)

```python
{
    "math": {
        "transport": "stdio",
        "command": "python",
        "args": ["/path/to/math_server.py"],
    }
}
```

### HTTP (Remote Server)

```python
{
    "weather": {
        "transport": "http",
        "url": "http://localhost:8000/mcp",
    }
}
```

## Create Custom MCP Server

Use [FastMCP](https://gofastmcp.com/) library:

```python
from fastmcp import FastMCP

mcp = FastMCP("Math")

@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

@mcp.tool()
def multiply(a: int, b: int) -> int:
    """Multiply two numbers"""
    return a * b

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

## Stateful Sessions

`MultiServerMCPClient` is stateless by default. Each tool invocation creates a fresh `ClientSession`, executes the tool, and then cleans up.

For stateful sessions, see the MCP documentation for session management patterns.

## Related Topics

- [Tool Basics](tools/tool-basics.md)
- [Agent Basics](agents/agent-basics.md)
