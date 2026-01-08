# Retrieval

Retrieval addresses LLM limitations (finite context, static knowledge) by fetching relevant external knowledge at query time.

## RAG Architectures

| Architecture | Description | Control | Flexibility | Latency |
|--------------|-------------|---------|-------------|---------|
| **2-Step RAG** | Retrieval before generation | High | Low | Fast |
| **Agentic RAG** | LLM decides when/how to retrieve | Low | High | Variable |
| **Hybrid** | Combines both with validation | Medium | Medium | Variable |

## 2-Step RAG

Retrieval always happens before generation:

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def search_knowledge_base(query: str) -> str:
    """Search internal documentation for relevant information."""
    # Your retrieval logic here
    return relevant_docs

agent = create_agent(
    model="gpt-4o",
    tools=[search_knowledge_base],
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "How do I configure authentication?"}]
})
```

## Building a Knowledge Base

Components needed:

1. **Document Loaders** - Ingest data from sources (Google Drive, Slack, Notion)
2. **Text Splitters** - Break docs into chunks
3. **Embedding Models** - Convert text to vectors
4. **Vector Stores** - Store and search embeddings
5. **Retrievers** - Return documents given a query

## Agentic RAG

An agent uses retrieval as a tool when needed:

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def search_docs(query: str) -> str:
    """Search documentation for answers."""
    return documentation_results

@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    return web_results

@tool
def search_database(query: str) -> str:
    """Query internal database."""
    return db_results

agent = create_agent(
    model="claude-sonnet-4-5-20250929",
    tools=[search_docs, search_web, search_database],
    system_prompt="You are a research assistant. Use tools to find information as needed."
)
```

## Related Topics

- [Agent Basics](agents/agent-basics.md)
- [Tool Basics](tools/tool-basics.md)
