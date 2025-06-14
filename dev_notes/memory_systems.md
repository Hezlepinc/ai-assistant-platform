---
title: Memory System Architecture
intent: memory_design
tags:
  - memory
  - redis
  - mongodb
  - context
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T18:04:00.000Z"
---

# Memory System Architecture

This document outlines the dual-layer memory system that powers intelligent context retention across all assistants in the AI Assistant Platform.

---

## Layered Memory Approach

### 1. Redis – Short-Term Memory

- Fast-access in-memory store for session state and context.
- Keyed by `sessionId` or `userId`.
- Stores:
  - Routing flags (active assistant, fallback state)
  - Ephemeral memory (last 1–3 interactions)
  - Tool chain progress markers

### 2. MongoDB – Long-Term Memory

- Persistent database for structured assistant memory.
- Stores:
  - Project snapshots and history
  - DevNotes and assistant config references
  - User feedback (via `FeedbackLog`)
  - Intent coverage and memory-linked corrections
- Ideal for versioned knowledge, assistant-specific memory scopes, and analytics.

---

## Memory Features

- Memory is assistant-scoped and project-aware.
- Context injected into prompts by DevNoteManager.
- Indexed queries for semantic memory lookups.
- Secure access via token/session validation.

---

## Key Memory Schemas

- `SessionMemory`: temporary per-session memory state
- `FeedbackLog`: thumbs up/down analytics + correction tracking
- `DevNote`: versioned knowledge units for prompt injection
- `ProjectSnapshot`: point-in-time codebase reference for dev assistants

---

_Last updated: 2025-06-14_
