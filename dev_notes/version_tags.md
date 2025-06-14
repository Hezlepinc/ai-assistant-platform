---
title: "# Version Tags"
intent: version_tags
tags: [versioning, github]
project: "ai-assistant-platform"
source: "structured-dev-note"
timestamp: "2025-06-14T18:45:00.000Z"
---

# Version Tags

Tracks GitHub release milestones for the AI Assistant Platform.

---

## v0.1 – Foundation

- Initial project scaffolding and folder structure
- Core setup for `dev_notes` and `commands.md`
- Basic MongoDB + Redis local development config
- DevNote seed script and import system

---

## v0.2 – Orchestration Layer

- AssistantRouter, IntentRouter, and ToolRouter
- Orchestrator fallback logic (Claude → GPT-4)
- MemoryManager (Redis/Mongo) live
- DevNoteManager integrated into prompt injection

---

## v0.3 – Developer UI

- Assistant control panel and DevNote viewer
- Feedback analytics dashboard (thumbs up/down)
- Admin interface for assistant edits
- Prompt DSL previews + edits

---

## Planned Tags

- **v0.4** – Full plugin registry and tool execution
- **v0.5** – Autonomous assistant generation and DSL-driven scaffolding
- **v0.6+** – Public preview, external assistant deployment, multi-user support
