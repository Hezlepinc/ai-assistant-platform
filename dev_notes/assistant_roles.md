---
title: Assistant Roles
intent: role_definition
tags:
  - assistant_roles
  - permissions
  - architecture
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T15:10:00.000Z"
---

# Assistant Roles

This document outlines the core assistant roles within the AI Assistant Platform. Each assistant operates with specific context, data access, and routing behavior as defined by its configuration.

## AI Architect (Core Orchestrator)

- Purpose: Orchestrates assistant interactions, routes requests, manages fallback logic, and maintains memory.
- Access: Full system scope including Redis state, prompt injection, assistant configs.

## Developer Assistant

- Purpose: Aids in coding, debugging, running commands, generating documentation, and navigating file structures.
- Access: Project filesystem (read), dev notes, commands registry, assistant configs.

## Customer Service Assistant (CSR)

- Purpose: Supports customer inquiries, pricing questions, product guidance, and appointment scheduling.
- Access: Pricebook, FAQ knowledge base, scheduling tools, fallback logic with Claude as primary LLM.

## Personal Task Assistant

- Purpose: Manages personal to-do lists, reminders, scheduling, and productivity tasks for individual users.
- Access: Local user memory, calendar/scheduling tools, user context.

Each role is permission-scoped and assistant-aware, with context layering handled by the AI Architect Core.
