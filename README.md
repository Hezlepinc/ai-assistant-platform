# 🧠 AI Assistant Platform – Hezlep Inc.

This project is a purpose-built AI assistant framework developed exclusively for **Hezlep Inc.** It is not a general-purpose toolkit — it's the core engine powering a new intelligent business system designed to streamline development, automate internal operations, and support customer-facing AI agents.

---

## 🏗️ Core Purpose

The platform is designed for one goal:

> 💡 To serve as the backbone of Hezlep Inc.’s AI operations — enabling the creation, optimization, and orchestration of intelligent assistants across business areas.

---

## 🧬 Architecture Overview

This platform includes a modular architecture consisting of:

- **🧠 AI Architect Core** – The orchestration layer (router, prompt manager, memory handler)
- **👤 Personal & Professional Assistants** – Modular agents for dev work, emails, CSR, and more
- **🏢 Company Deployments** – Business-specific assistants for field ops, scheduling, sales, and CRM

---

## 📦 Tech Stack

| Component         | Purpose                                       |
| ----------------- | --------------------------------------------- |
| MongoDB Atlas     | Persistent memory (sessions, notes, feedback) |
| Pinecone          | Vector database for semantic DevNote search   |
| Redis             | Active memory and state management            |
| OpenAI / Claude   | LLM execution with fallback strategy          |
| React + Vite      | Frontend interface for dev and admin          |
| Node.js + Express | Backend API and service layer                 |

---

## 🧠 Intelligent Design

This platform stores **every assistant interaction**, **DevNote**, and **chat session** to:

- Improve context-aware responses
- Offer actionable insights
- Train assistants with long-term memory

All chat sessions, quick actions, and prompt components are persistently stored in:

- 🔹 MongoDB (chat logs, dev notes, sessions, feedback)
- 🔹 Pinecone (vectorized context and dev note embeddings)

---

## 🚀 Current Status

Actively building:

- ✅ DevNotes viewer with smart filtering
- ✅ QuickActions and assistant router
- 🔜 Multi-assistant orchestration and plugin system
- 🔜 AI feedback loop and performance dashboard

---

## 📁 Developer Resources

- `dev_notes/` – Full architecture breakdown
- `scripts/` – Seeders, vector loaders, and DevNote utilities
- `ai-architect-core/` – Orchestrator, managers, and routers

---

## ⚠️ Private Use

This is a private project for Hezlep Inc. Not intended for public deployment or open-source contribution at this time.
