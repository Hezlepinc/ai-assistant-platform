---
title: Deployment Plan
intent: deployment_strategy
tags:
  - deployment
  - infra
  - production
project: ai-architect-core
source: bulk-import
timestamp: "2025-06-14T15:44:00.000Z"
---

## Deployment Plan

This document outlines the strategy for deploying the AI Assistant Platform across development and production environments with scalability, reliability, and cloud portability in mind.

---

### 🌐 Hosting Infrastructure

**Production:**

- **Platform:** Render.com or Fly.io (auto-scaling, cloud-managed)
- **Database:** MongoDB Atlas (shared cluster)
- **Redis:** Upstash Redis (cloud-based)
- **Environment:** `NODE_ENV=production`

**Development:**

- **Platform:** Local Node.js
- **Database:** MongoDB Community Edition (port 27017)
- **Redis:** Redis Server (localhost)
- **Environment:** `NODE_ENV=development`

---

### 🚀 Deployment Strategy

| Component    | Dev (Local)          | Prod (Cloud)                |
| ------------ | -------------------- | --------------------------- |
| API Server   | Node.js (localhost)  | Render / Fly.io             |
| MongoDB      | `localhost:27017`    | MongoDB Atlas               |
| Redis        | `localhost:6379`     | Upstash Redis               |
| File Storage | Local / Google Drive | Google Drive / S3 (planned) |
| Command      | `npm run dev`        | `npm start` via deploy hook |

---

### 🧠 Smart Environment Handling

- Detects environment from `NODE_ENV`
- Uses `.env` to switch between dev/prod config
- Fallbacks prevent app crashes if service is down

---

### 📦 Hosting Considerations

**Render Deployment Tips:**

- Set environment variables in dashboard:
  - `NODE_ENV=production`
  - `MONGO_URI_PROD`
  - `REDIS_URL_PROD`
- Enable automatic deploy from GitHub repo

**Fly.io Tips:**

- Add persistent volumes (if needed)
- Configure `fly.toml` for app scaling, secrets, and region choice

---

### 💸 Cost Estimates

| Service       | Monthly Estimate    |
| ------------- | ------------------- |
| MongoDB Atlas | $0–14 (shared tier) |
| Upstash Redis | $1–5 (low volume)   |
| Render Dyno   | $7+ per instance    |
| **Total**     | **$15–25**          |

---

### ✅ Setup Summary

- [x] `.env` switching between `NODE_ENV=development` and `NODE_ENV=production`
- [x] Dual Redis config (local + Upstash)
- [x] Dual Mongo config (localhost + Atlas)
- [x] Cloud deploy-ready via Render or Fly
