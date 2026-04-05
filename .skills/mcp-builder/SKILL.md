---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
license: Complete terms in LICENSE.txt
---

# MCP Server Development Guide

## Overview

Create MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. The quality of an MCP server is measured by how well it enables LLMs to accomplish real-world tasks.

---

# Process

## 🚀 High-Level Workflow

Creating a high-quality MCP server involves four main phases:

### Phase 1: Deep Research and Planning

#### 1.1 Understand Modern MCP Design

**API Coverage vs. Workflow Tools:**
Balance comprehensive API endpoint coverage with specialized workflow tools. Workflow tools can be more convenient for specific tasks, while comprehensive coverage gives agents flexibility to compose operations.

**Tool Naming and Discoverability:**
Clear, descriptive tool names help agents find the right tools quickly. Use consistent prefixes (e.g., `github_create_issue`, `github_list_repos`) and action-oriented naming.

**Context Management:**
Agents benefit from concise tool descriptions and the ability to filter/paginate results. Design tools that return focused, relevant data.

**Actionable Error Messages:**
Error messages should guide agents toward solutions with specific suggestions and next steps.

#### 1.2 Study MCP Protocol Documentation

**Navigate the MCP specification:**

Start with the sitemap to find relevant pages: `https://modelcontextprotocol.io/sitemap.xml`

Then fetch specific pages with `.md` suffix for markdown format (e.g., `https://modelcontextprotocol.io/specification/draft.md`).

Key pages to review:
- Specification overview and architecture
- Transport mechanisms (streamable HTTP, stdio)
- Tool, resource, and prompt definitions

#### 1.3 Study Framework Documentation

**Recommended stack:**
- **Language**: TypeScript (high-quality SDK support and good compatibility)
- **Transport**: Streamable HTTP for remote servers, using stateless JSON. stdio for local servers.

---

## Phase 2: Design and Implementation

### 2.1 Design Principles

**Tool Design:**
- Each tool should do ONE thing well
- Tool names should be verbs (actions)
- Parameters should be self-documenting
- Include examples in tool descriptions

**Error Handling:**
- Return structured error responses
- Include actionable next steps in error messages
- Log errors server-side for debugging

**Security:**
- Validate all inputs
- Use environment variables for secrets
- Implement rate limiting
- Consider authentication/authorization

### 2.2 Implementation Patterns

**TypeScript SDK Example:**

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "my-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_documents",
        description: "Search through document collection",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query string",
            },
            limit: {
              type: "number",
              description: "Maximum results to return",
              default: 10,
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === "search_documents") {
    const { query, limit = 10 } = args;
    // Implementation here
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results),
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Phase 3: Testing and Validation

### 3.1 Manual Testing

Test your MCP server with real queries:
- Simple queries
- Complex multi-step workflows
- Edge cases and error conditions

### 3.2 Integration Testing

- Test with actual MCP clients
- Verify tool discovery works correctly
- Test error handling paths

---

## Phase 4: Documentation and Deployment

### 4.1 Documentation

- Clear README with setup instructions
- Tool descriptions with examples
- Configuration options
- Troubleshooting guide

### 4.2 Deployment

**For stdio transport:**
- Package as executable
- Distribute via package managers

**For HTTP transport:**
- Deploy to cloud platform
- Configure proper authentication
- Set up monitoring and logging

---

## Best Practices Summary

1. **Start simple** - Build one tool that works well before adding more
2. **Design for LLMs** - Tool names and descriptions should be clear to AI
3. **Handle errors gracefully** - Provide actionable error messages
4. **Test thoroughly** - Use real-world scenarios
5. **Document well** - Make setup and usage crystal clear
6. **Iterate based on usage** - Improve based on actual agent interactions

---

## Resources

- **MCP Specification**: https://modelcontextprotocol.io
- **TypeScript SDK**: https://github.com/modelcontextprotocol/typescript-sdk
- **Python SDK**: https://github.com/modelcontextprotocol/python-sdk
