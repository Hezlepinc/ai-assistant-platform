---
title: "# Tools Library"
intent: tools_library
tags: [tools, actions, execution]
project: "ai-architect-core"
source: "structured-dev-note"
timestamp: "2025-06-14T18:38:00.000Z"
---

# Tools Library

This file defines and documents the core tools available for AI assistants, enabling action-based responses (tool use, file generation, context lookups).

---

## 🎯 Purpose

Provide assistants with callable utilities (functions) that can:

- Access project structure
- Generate files, diagrams, maps
- Interface with external systems (e.g., Google Drive, calendar)

---

## 🔨 Tool Categories

| Tool Group        | Description                            |
| ----------------- | -------------------------------------- |
| File Analysis     | Scans and indexes project files        |
| Project Utilities | Creates maps, snapshots, and summaries |
| External Services | Hooks into APIs or databases           |
| Admin Tools       | DevNote editing, feedback resolution   |

---

## 🧩 Tool Execution Pattern

Each tool should:

- Accept a structured input payload
- Return standardized output
- Be defined in `/executors/ToolExecutor.js`

---

## 🗂 Example Tools

| Tool Name              | Description                              |
| ---------------------- | ---------------------------------------- |
| `scanProjectFiles`     | Walks a directory and extracts metadata  |
| `indexProject`         | Builds a keyword index for quick lookup  |
| `generateSitemap`      | Produces a full site or file tree map    |
| `snapshotProject`      | Summarizes project structure and purpose |
| `searchDevNotes`       | Retrieves relevant historical notes      |
| `generateDevAssistant` | Creates a new assistant from config      |

---

## 🧠 Future Tool Ideas

- `scheduleMeeting`: Book events from user requests
- `emailSummarizer`: Parse and summarize inbox messages
- `diagramGenerator`: Convert architecture text into flowcharts

---

## ✅ Tool Format Sample

```json
{
  "tool": "scanProjectFiles",
  "input": {
    "directory": "C:/User/DevProjects/my-app"
  }
}
```
