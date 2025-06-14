---
title: "## System Tiers Overview"
intent: system_tiers
tags: [system_tiers]
project: "ai-architect-core"
source: "structured-dev-note"
timestamp: "2025-06-14T18:25:00.000Z"
---

## System Tiers Overview

This note outlines the high-level architecture and responsibilities of the three primary tiers in the AI Assistant Platform:

---

### Tier 1: AI Architect Core

The centralized brain of the entire system. Responsible for orchestrating assistant routing, memory integration, configuration loading, and intelligent model fallback.

#### Responsibilities:

- Route requests dynamically via AssistantRouter, ToolRouter, IntentRouter
- Load assistant configurations and prompts from YAML files
- Handle Claude → GPT-4 fallback or parallel execution logic
- Manage Redis (short-term) and MongoDB (long-term) memory layers
- Evaluate assistant performance and trigger prompt/tool improvements
- Expose internal APIs for assistant feedback, diagnostics, and analytics

---

### Tier 2: Company Integrations

Company-facing assistants, tools, and workflows — used for operations, customer service, scheduling, billing, etc.

#### Responsibilities:

- Domain-specific assistants like CSR bot, Scheduling assistant, or Sales estimator
- Access and enforce internal logic (pricebooks, schedules, user permissions)
- Integrate with systems like:
  - ServiceTitan, QuickBooks, Salesforce
  - Internal APIs for booking, CRM, and lead management
- Generate customer reports, quotes, and maintain assistant-based operations

---

### Tier 3: Personal Assistants

User-owned assistants focused on productivity, task management, and support for individuals (e.g., professionals, founders, hobbyists).

#### Responsibilities:

- Handle personal productivity, email sorting, note management
- Act as personal dev/project assistant for founders and solo builders
- Integrate with Google Drive, Notion, Email, or Calendars
- Automatically review DevNotes, suggest roadmap updates
- Retain memory across projects and refine assistant behavior over time

---

### Notes:

- All tiers report to the AI Architect Core
- Each tier may have internal assistants, tools, and roles
- Assistants use the same memory layer and assistant-core foundation
