# Multi-Tenant Architecture for AI Assistant Platform

## Purpose

This note documents how to structure, isolate, and securely deploy AI assistants for multiple companies within the same platform — both subsidiaries (e.g., divisions of a parent company) and external clients.

## Architecture Overview

- **Central Core**: All assistant logic, routing, tool systems, memory, and logging live in `ai-architect-core/`.
- **Company Integrations**: Individual folders under `company-integrations/` for each company or brand.
- **Personal/Professional Assistants**: Isolated assistant behavior, goals, and memory for individuals.

## Deployment Strategy

- Use a single backend API (hosted via Render, Vercel, or your own VPS).
- Deploy frontend separately for each client/brand (e.g., different chatbot snippets or domains).
- Host assistants in memory as needed and persist long-term memory in MongoDB per tenant.

## Security & Isolation

- **Data Isolation**: Each assistant has its own:

  - MongoDB namespace (via `projectId`)
  - Redis namespace (via prefixing keys)
  - Vector DB namespace (e.g., Pinecone namespaces)

- **Access Control**:
  - API routes enforce projectId-based filtering
  - Token-based auth for client-side control (future)

## Long-Term Scalability

- You can support 100+ assistants on one backend as long as memory and DB access are segmented.
- External companies should use their own DB keys and storage.
- Billing, analytics, and error tracking should be segmented by company/assistant.

## Example Structure

ai-assistant-platform/
├── ai-architect-core/
├── company-integrations/
│ ├── lenhart-electric/
│ ├── incharge-electric/
│ ├── outside-client-a/
│ └── ...
└── dev_notes/

## Notes

- You can begin offering service to external non-competitive contractors by segmenting data and memory per assistant.
- Always log data access per tenant for audit trails and future billing logic.

## Tags

multi-tenant, assistant-isolation, security, scalability, dev-architecture
