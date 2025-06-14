---
title: AI Architect Core
intent: system_orchestration
tags:
  - orchestration
  - core
  - routing
  - fallback
project: ai-assistant-platform
source: manual_review
timestamp: "2025-06-14T14:45:00.000Z"
---

## AI Architect Core

The AI Architect Core serves as the command center of the AI Assistant Platform. It manages routing logic, assistant configuration, memory handling, and prompt strategy — orchestrating how assistants operate across tiers.

### Responsibilities

- Centralized routing to assistants using:
  - `AssistantRouter` for assistant selection
  - `ToolRouter` for executing tool-based actions
  - `IntentRouter` for matching assistant behavior to user goals
- Loads assistant-specific settings via `ConfigLoader`
- Oversees memory, prompt injection, and persona logic via:
  - `MemoryManager`
  - `PromptManager`
- Handles fallback logic between language models:
  - GPT-4 is the primary model for most assistants
  - Claude is the fallback (used if GPT-4 fails or underperforms)
  - For customer-facing assistants, **Claude is primary** and GPT-4 is fallback
- Maintains session state, runtime context, access control, and role binding

### Core Modules

- `routers/AssistantRouter.js`
- `routers/ToolRouter.js`
- `routers/IntentRouter.js`
- `managers/MemoryManager.js`
- `managers/PromptManager.js`
- `executors/ToolExecutor.js`
- `loaders/ConfigLoader.js`
- `schemas/AssistantConfig.yaml`

### Future Extensions

- Plugin architecture for toolchain extensibility
- Admin-controlled routing overrides for high-priority use cases
- Performance-based assistant selection logic
- Cross-assistant memory graph (for long-term personalization)
