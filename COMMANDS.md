# 📘 AI Assistant Platform – Commands & System Reference

This document contains all essential commands and references for working with the AI Assistant Platform.

---

## 🧠 System Architecture Overview

The system uses DevNotes stored in `dev_notes/` and imported into MongoDB to power assistant awareness and reasoning.

### Key DevNote Files

- `ai_architect_core.md` – Core routing logic, memory injection, and fallback model setup (Claude → GPT-4).
- `orchestrator_design.md` – Manages model calls, tool execution, and response shaping.
- `tools_library.yaml` – Schema and access rules for all executable tools.
- `prompt_dsl_framework.yaml` – Defines prompt components using a domain-specific language (DSL).
- `system_tiers.yaml` – Three-part system model:
  - **AI Architect Core** – Routing, memory, and execution
  - **Company Integrations** – APIs, workflows, industry logic
  - **Personal Assistants** – Focused agents (DevOps, Scheduling, Email)

---

## 🚀 Startup & Development

### Start Local Server

```bash
node server/index.js

npm run import:devnotes

node scripts/fullSync.js

```
