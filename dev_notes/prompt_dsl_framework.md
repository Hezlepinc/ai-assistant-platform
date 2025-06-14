---
title: "# Prompt DSL Framework"
intent: prompt_dsl_framework
tags: [prompts, dsl, structure]
project: "ai-architect-core"
source: "structured-dev-note"
timestamp: "2025-06-14T18:05:00.000Z"
---

# Prompt DSL Framework

This file defines a modular system for structuring and customizing assistant prompts using a domain-specific language (DSL).

---

## 🧠 Purpose

Enable assistants to:

- Dynamically inject user/system prompts
- React to project-specific context and memory
- Support assistant behavior configuration through YAML or JSON templates

---

## 🔧 Components

- `/prompts/systemPrompt.js`: Base tone, role, safety settings
- `/prompts/userPrompt.js`: Incoming user input formatting
- `/prompts/instructionPrompt.js`: Assistant-specific instructions

---

## 🗂️ Prompt Types

| Type          | Purpose                                      |
| ------------- | -------------------------------------------- |
| `system`      | Foundation prompt for assistant behavior     |
| `user`        | Transforms user input                        |
| `instruction` | Custom logic and configuration per assistant |
| `contextual`  | Pulls in memory or recent interactions       |
| `tool-call`   | Formats prompts to trigger tool usage        |

---

## 🧱 Prompt Composition Flow

```text
[user input] → userPrompt.js
              ↓
     + systemPrompt.js
     + instructionPrompt.js
     + memory/context chunks
              ↓
     → Final compiled prompt to LLM
```

Last updated: 2025-06-14
