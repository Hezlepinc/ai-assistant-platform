---
title: Context Injection Strategy
intent: context_injection
tags:
  - prompt_injection
  - context
  - devnote
  - memory
project: ai-architect-core
source: architecture
timestamp: "2025-06-14T15:27:00.000Z"
---

# Context Injection Strategy

This document outlines the strategy for dynamically injecting relevant `DevNotes` and memory context into assistant prompts during runtime. This ensures that assistants stay project-aware and can adapt to changes without manual prompt rewrites.

---

## Purpose

To enable **automatic prompt enrichment** by pulling relevant:

- `DevNotes` (e.g. assistant roles, tools, DSL)
- `Project tags` and metadata
- Long-term assistant memory (MongoDB)

---

## Injection Points

1. **Prompt Construction**

   - Before sending the prompt to the LLM (Claude/GPT-4o)
   - Based on assistant identity or request context

2. **Orchestrator Middleware**

   - The orchestrator queries the `DevNoteManager`
   - Matches by `intent`, `session`, or `project` tags

3. **Fallback Logic**
   - If relevant context is missing, inject `default` notes or a minimal scaffold

---

## Benefits

- Modular and reusable prompts
- Assistants stay up to date with evolving project details
- Enables automatic alignment with project roadmap and assistant roles

---

## Implementation Notes

- Use Redis for short-term lookup of `activeDevNoteContext`
- Use MongoDB to fetch long-term notes (tagged by assistant role or project intent)
- Enable per-assistant injection profiles (e.g., `dev`, `csr`, `email`)

---

_Last updated: 2025-06-14_
