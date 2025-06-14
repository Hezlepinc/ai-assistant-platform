---
title: "Project Setup Guide"
intent: project_setup
tags: [setup, env, init]
project: "ai-architect-core"
source: "structured-dev-note"
timestamp: "2025-06-14T17:44:00.000Z"
---

# Project Setup Guide

This file outlines initial project setup, environment configuration, and essential development commands for the AI Assistant Platform.

---

## 🛠️ Core Development Commands

```bash
npm run dev                   # Starts dev server with local MongoDB and Redis
npm run seed:devnotes         # Seeds sample DevNote(s) into MongoDB
npm run import:devnotes       # Bulk import dev_notes/*.md and *.yaml into MongoDB
npm run upsert:devnotes       # Upsert DevNotes into Pinecone vector DB
npm run clear:pinecone        # Clears all vectors from Pinecone index
npm run sync:notes            # Sync Pinecone + MongoDB DevNotes for alignment
npm run vector:diagnostics    # Show Pinecone stats (count, tags, etc.)
npm run vector:test-query     # Run test query against Pinecone index
npm run rebuild:vector-db     # Clear + rebuild all DevNote vectors from scratch
npm run evaluate:intents      # Check which DevNotes are missing vector support
npm run vector:watch          # Dev mode: re-embed notes on file save

NODE_ENV=development
MONGO_URI_LOCAL=mongodb://localhost:27017/dev-db
REDIS_URL_LOCAL=redis://localhost:6379
PINECONE_API_KEY=...
PINECONE_INDEX=devnotes-index
```
