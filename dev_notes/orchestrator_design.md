---
title: Orchestrator Design
intent: orchestrator_overview
tags:
  - orchestrator
  - control
  - pipeline
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T18:30:00.000Z"
---

# 🧠 Orchestrator Design

The Orchestrator is the central controller for AI Assistant execution. It manages routing, memory context, tool execution, and model fallback strategies.

---

## Responsibilities

- Route incoming requests to the appropriate assistant (CSR, Dev, Email, etc.)
- Dynamically load assistant configuration and project context
- Inject memory and DevNote data into the prompt pipeline
- Execute tools, actions, or function-calling chains
- Apply fallback strategies (Claude → GPT-4 for CSR, GPT-4 → Claude for others)
- Log key metadata for performance analytics and improvement

---

## Subsystems

- **AssistantRouter**: Determines correct assistant handler
- **IntentRouter**: Selects logic based on assistant intent
- **ToolRouter**: Delegates tool actions like schedule, pricing, email

---

## Execution Pipeline

1. **Context Injection**

   - Loads memory from Redis and MongoDB
   - Fetches DevNotes by tag/intent

2. **Prompt Construction**

   - Assembles prompt using assistant config and system instructions

3. **Tool Execution**

   - Uses `ToolExecutor` and `ActionRunner` to run or simulate tools

4. **LLM Query**

   - Sends to Claude or GPT-4 depending on assistant type
   - Tracks timing, confidence, fallback

5. **Fallback Handling**
   - Default: GPT-4 (Dev, Email) → Claude fallback
   - Customer Chat: Claude → GPT-4 fallback

---

## Analytics + Telemetry

- Logs usage, latency, fallbacks, and feedback
- Sends aggregated metrics to Admin Dashboard
- Enables performance-aware routing in future

---

_Last updated: 2025-06-14_
