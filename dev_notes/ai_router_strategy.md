---
title: AI Router Strategy
intent: assistant_routing
tags:
  - routing
  - assistants
  - sessions
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T15:02:00.000Z"
---

## AI Router Strategy

The AI Router handles intelligent assistant dispatching based on request context, session data, and system configuration.

### Responsibilities

- Dynamically routes requests to the correct assistant
- Supports routing via:
  - Redis state (e.g., current active assistant)
  - URL path prefix (e.g., `/api/assistant-dev`)
  - Token or role-based context
- Acts as a gateway to modular AI assistants in the platform

### Routing Modes

- **Session-based:** Tracks active assistant in Redis per user/session
- **Path-based:** Determines assistant from route prefix
- **Token-based:** Routes by role or assistant identity (e.g., `admin`, `csr`, `tech`)

### Core File

- `routers/AssistantRouter.js`

### Example Pseudocode

```js
if (path.includes("dev")) return forwardTo(devAssistant);
else if (redisState === "csr") return forwardTo(csrAssistant);
else if (token.role === "admin") return forwardTo(adminAssistant);
```
