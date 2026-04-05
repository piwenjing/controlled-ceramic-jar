---
name: claude-api
description: "Build apps with the Claude API or Anthropic SDK. TRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK. DO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks."
license: Complete terms in LICENSE.txt
---

# Building LLM-Powered Applications with Claude

This skill helps you build LLM-powered applications with Claude. Choose the right surface based on your needs, detect the project language, then read the relevant language-specific documentation.

## Defaults

Unless the user requests otherwise:

For the Claude model version, please use Claude Opus 4.6, which you can access via the exact model string `claude-opus-4-6`. Please default to using adaptive thinking (`thinking: {type: "adaptive"}`) for anything remotely complicated. And finally, please default to streaming for any request that may involve long input, long output, or high `max_tokens` — it prevents hitting request timeouts.

---

## Language Detection

Before reading code examples, determine which language the user is working in:

1. **Look at project files** to infer the language:

   - `*.py`, `requirements.txt`, `pyproject.toml`, `setup.py`, `Pipfile` → **Python**
   - `*.ts`, `*.tsx`, `package.json`, `tsconfig.json` → **TypeScript**
   - `*.js`, `*.jsx` (no `.ts` files present) → **TypeScript** — JS uses the same SDK
   - `*.java`, `pom.xml`, `build.gradle` → **Java**
   - `*.kt`, `*.kts`, `build.gradle.kts` → **Java** — Kotlin uses the Java SDK
   - `*.scala`, `build.sbt` → **Java** — Scala uses the Java SDK
   - `*.go`, `go.mod` → **Go**
   - `*.rb`, `Gemfile` → **Ruby**
   - `*.cs`, `*.csproj` → **C#**
   - `*.php`, `composer.json` → **PHP**

2. **If multiple languages detected** (e.g., both Python and TypeScript files):

   - Check which language the user's current file or question relates to
   - If still ambiguous, ask: "I detected both Python and TypeScript files. Which language are you using for the Claude API integration?"

3. **If language can't be inferred** (empty project, no source files, or unsupported language):

   - Use AskUserQuestion with options: Python, TypeScript, Java, Go, Ruby, cURL/raw HTTP, C#, PHP
   - If AskUserQuestion is unavailable, default to Python examples

4. **If unsupported language detected** (Rust, Swift, C++, Elixir, etc.):

   - Suggest cURL/raw HTTP examples and note that community SDKs may exist
   - Offer to show Python or TypeScript examples as reference implementations

### Language-Specific Feature Support

| Language   | Tool Runner | Agent SDK | Notes                                 |
| ---------- | ----------- | --------- | ------------------------------------- |
| Python     | Yes (beta)  | Yes       | Full support — `@beta_tool` decorator |
| TypeScript | Yes (beta)  | Yes       | Full support — `betaZodTool` + Zod    |
| Java       | Yes (beta)  | No        | Beta tool use with annotated classes  |
| Go         | Yes (beta)  | No        | `BetaToolRunner` in `toolrunner` pkg  |
| Ruby       | No          | No        | Basic SDK support                     |
| C#         | No          | No        | Basic SDK support                     |
| PHP        | No          | No        | Basic SDK support                     |

---

## Core Capabilities

### Messages API

The primary API for sending messages to Claude:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ]
)
print(response.content[0].text)
```

### Streaming

For long responses, use streaming to avoid timeouts:

```python
with client.messages.stream(
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Write a long story..."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Tool Use

Enable Claude to use external tools:

```python
from anthropic import Anthropic

client = Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "Get weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
]

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Paris?"}]
)
```

### Thinking/Reasoning

Enable extended thinking for complex tasks:

```python
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    thinking={
        "type": "enabled",
        "budget_tokens": 2000
    },
    messages=[{"role": "user", "content": "Solve this complex problem..."}]
)
```

---

## Best Practices

1. **Use streaming for long outputs** - Prevents timeouts and improves perceived performance
2. **Enable thinking for complex tasks** - Use `thinking: {type: "adaptive"}` for automatic detection
3. **Handle tool use loops properly** - Continue the conversation until Claude stops calling tools
4. **Implement proper error handling** - Handle rate limits, timeouts, and API errors gracefully
5. **Use appropriate max_tokens** - Balance between completeness and cost

---

## Resources

- **Python SDK**: `pip install anthropic`
- **TypeScript SDK**: `npm install @anthropic-ai/sdk`
- **Documentation**: https://docs.anthropic.com
