# AI Handoff

## Project Summary

GemWatch Pro is a planned modular on-chain intelligence platform progressing from evidence collection and research through backtesting and paper trading to, only after later safety gates, controlled live execution. Scores and AI are advisory; no profitability or authorization is implied.

## Current Stage

Foundation after completed Sprint 0.2. Product version is 0.0.2 and specification version is 0.2.0. Architecture and initial technology decisions are accepted, but the development platform is not implemented. Application code, integrations, schema, deployment, paper trading, wallets, and live trading have not started.

- Application code: Not started
- Production deployment: Not started
- Live trading: Disabled / Not implemented
- Paper trading: Not implemented
- Development platform: Specified, not implemented

## Completed Work

- Sprint 0.1 governance/documentation/repository skeleton
- Sprint 0.2 official-source technology evaluation and weighted matrix
- System boundaries and data/event/observability/development/AWS architecture
- ADR-0002–ADR-0019 accepted and MEM-013–MEM-030 recorded
- Existing specification, architecture, roadmap, standards, state, memory, protocol, and changelog synchronized

## Accepted Initial Architecture

Modular monolith first; TypeScript on supported Node.js LTS; React/Vite; Fastify; pnpm workspaces/Turborepo; PostgreSQL/Drizzle reviewed SQL migrations; Redis/BullMQ with PostgreSQL outbox/idempotency; REST/OpenAPI/WebSocket; provider/chain adapters; OpenTelemetry plus structured JSON logs; Vitest/Testcontainers/Playwright; native Node plus Compose local infrastructure; GitHub Actions; isolated AWS-host staging; ECS Fargate/RDS/managed Redis/S3/Secrets Manager production direction; Cognito OIDC + PKCE; exact numeric and UTC policies.

## Not Yet Done

No package.json, lockfile, runtime dependency, Compose file, workflow, database schema/migration, API endpoint, React screen, server, provider SDK, chain selection, AWS connection/resource, credential, wallet, or trade code exists. Exact package/container/action versions are not pinned. UI supporting libraries, initial chain/providers, detailed schemas, telemetry backend, AWS sizes/region/RTO/RPO, and live custody remain deferred.

## Binding Decisions

MEM-001–MEM-030 and ADR-0001–ADR-0019 are canonical. Repository truth, documentation first, provider adapters, security corroboration, Risk Manager non-bypass, paper-before-live, live opt-in/off-by-default, secret exclusion, AI non-authorization, audit immutability, paper/live separation, exact arithmetic, and application-owned authorization cannot be weakened silently.

## Required Reading Order

1. PROJECT_SESSION_STATE.md
2. AI_HANDOFF.md
3. AI_MEMORY.md
4. GemWatch_Engineering_Specification.md
5. TECHNOLOGY_EVALUATION.md and TECHNOLOGY_DECISION_MATRIX.md
6. ARCHITECTURE.md and SYSTEM_BOUNDARIES.md
7. DATA_ARCHITECTURE.md, EVENT_ARCHITECTURE.md, OBSERVABILITY_ARCHITECTURE.md
8. DEVELOPMENT_PLATFORM.md and AWS_DEPLOYMENT_ARCHITECTURE.md
9. Relevant standards and ADRs
10. ROADMAP.md and CHANGELOG.md

## Sprint 0.2 Outcome

The first implementable technical architecture is documented and accepted. The architecture remains a plan, not working software or production readiness. No chain/provider or live capability was selected or implemented.

## Next Task

Sprint 0.3 — Development Platform Bootstrap. Pin the supported Node LTS and pnpm; create workspace/root tooling, manifests, formatting/lint/type/test/build/documentation/security gates, local PostgreSQL/Redis Compose services, environment examples, base GitHub Actions, and minimal health-check-only web/API/worker shells. Implement no domain feature.

## Output and Validation Rules

Repository artifacts are English; user sprint reports follow requested language. Before closure validate structure, links, Mermaid, ADR/memory/state consistency, versions, secrets, tests, staged diff, commit/push, and local/remote SHA. Report every skipped/failed check honestly.

## Evidence and Assumptions

Verify current official support, compatibility, security status, licensing, and platform constraints before pinning. Never invent provider behavior, benchmark performance, AWS pricing, application capability, or successful test/deployment state. Preserve external-verification items.

## Repository-First Rule

Inspect working tree, branch, remote, history, VERSION, state, and accepted ADRs before edits. Repository evidence overrides chat. Preserve unrelated user work and do not reinterpret placeholder directories as implemented services.

## Sprint-Close Updates

Every sprint updates PROJECT_SESSION_STATE.md, AI_HANDOFF.md, CHANGELOG.md, and all materially affected memory, specification, architecture, roadmap, standards, ADRs, and version metadata. Next Task must be explicit and verifiable.
