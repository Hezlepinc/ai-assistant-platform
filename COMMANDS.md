## 📘 System Architecture Reference

Project design documents are stored in the `dev_notes/` folder and imported into MongoDB to support assistant memory and reasoning.

Each file defines part of the platform's architecture:

- `ai_architect_core.md` – Central logic for assistant routing, config management, and fallback models (Claude > GPT-4).
- `orchestrator_design.md` – Manages model function execution, tool calling, and assistant response flow.
- `tools_library.yaml` – Lists all backend-executable tools with schema, access rules, and descriptions.
- `prompt_dsl_framework.yaml` – Describes the custom prompt structure used by assistants (DSL = Domain-Specific Language).
- `system_tiers.yaml` – Defines the 3-layer system structure:
  - **AI Architect Core** – Orchestrator + memory + routing logic
  - **Company Integrations** – APIs, workflows, business logic
  - **Personal Assistants** – Task-specific agents (DevOps, Scheduling, Email, etc.)

📥 To re-import these files into MongoDB at any time:

```bash
npm run import:devnotes
```

## 🧠 Injecting DevNote Context

To wire DevNote awareness into prompts:

1. Import `DevNoteManager` into orchestrator or prompt builders
2. Use `fetchNotesByIntent(intent)` or `fetchContext({ intent })`
3. Inject results into prompt construction (e.g., `systemPrompt`, `userPrompt`)
4. Optional: Use `project`, `tag`, or `source` filters

Assistants and orchestrator will gain stronger project comprehension through this pattern.

## Startup Commands

### Development

```bash
node server/index.js
```
