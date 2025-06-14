---
title: Project Personas
intent: user_personas_definition
tags:
  - project_personas
  - user_context
  - assistant_behavior
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T18:45:00.000Z"
---

# 👥 Project Personas

Defines key personas that AI assistants must understand, adapt to, and serve across the AI Assistant Platform.

---

## 1. Project Owner (You)

- **Role**: Platform architect and strategic lead
- **Needs**:
  - Full control over assistant logic, tooling, memory
  - Fast iteration and reliable automation
  - Reports, dashboards, dev assistant visibility
- **Behavior Influence**:
  - Provides elevated access, all assistant permissions
  - Can override routing, inject memory, or edit config live

---

## 2. Developer Collaborator

- **Role**: External or internal contributor helping with code, docs, or assistant building
- **Needs**:
  - Clear development instructions and project scaffolding
  - Access to Dev Assistant for project inspection and tooling
- **Behavior Influence**:
  - Assistant replies should simplify instructions
  - Hide admin tools unless explicitly granted access

---

## 3. End Users (Customers, Homeowners)

- **Role**: Final users interacting with production-deployed assistants (e.g., CSR)
- **Needs**:
  - Friendly, helpful, non-technical responses
  - Fast answers about pricing, services, scheduling
- **Behavior Influence**:
  - Customer Chat Assistant defaults to Claude, GPT-4 as fallback
  - Strip technical references, follow branding tone

---

## 4. Internal Stakeholders (Ops, Sales, Admin)

- **Role**: Company-facing staff reviewing analytics or using feedback dashboards
- **Needs**:
  - Admin panels, feedback stats, deployment metrics
  - Control over assistant configurations and content
- **Behavior Influence**:
  - Assistants offer structured summaries, visual dashboards
  - Expose metrics and correction history when queried

---

_Last updated: 2025-06-14_
