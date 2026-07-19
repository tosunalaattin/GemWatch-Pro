# AI Handoff

## Project Summary

GemWatch Pro is a planned modular on-chain intelligence platform. Product version 0.0.4 provides only a validated development platform and health shells. Scores and AI remain advisory concepts; no financial result or transaction authority is implied.

## Current Stage and Sprint Result

Foundation, after completed Sprint 0.3.1. The repository has a Node/pnpm workspace, React/Vite web shell, Fastify API shell, worker lifecycle, shared foundation packages, loopback-only Compose PostgreSQL/Redis, layered tests, and CI/security gates. Real integration, API fault/recovery, worker signals, Playwright smoke, and hosted workflows are validated. Specification version remains 0.3.0.

## Completed Work

- Sprint 0.1 governance and repository skeleton
- Sprint 0.2 architecture/technology research with ADR-0002–ADR-0019
- Sprint 0.3 exact manifests/lockfile, platform tooling, health contract/endpoints, safe configuration/logging/telemetry, local infrastructure, CI, tests, and operational documentation
- Sprint 0.3.1 Docker/Compose stabilization, real Testcontainers integration, API readiness/fault recovery, worker runtime signals, deterministic E2E startup, ESLint flat-config cleanup, and hosted workflow verification

## Not Yet Done

No token/pool/wallet model, domain schema/migration, scanner, provider/chain connection, score, strategy, backtest, paper trade, login/Cognito, AWS resource, wallet, transaction, or live capability exists. No worker domain queue/job is registered. Production deployment has not started.

## Binding Decisions and Invariants

ADR-0001–ADR-0019 and MEM-001–MEM-037 are canonical. Do not bypass Risk Manager, enable live trading, authorize a trade from AI, commit secrets, couple providers to domain logic, use JavaScript number for financial values, make Redis authoritative, add runtime migrations, or weaken exact UTC/configuration/CI boundaries. Technology changes require a superseding ADR.

## Required Reading

Read PROJECT_SESSION_STATE, this handoff, AI_MEMORY, MASTER_PROMPT, the engineering specification, architecture/system boundaries, development/local/environment/health documents, applicable standards/ADRs, roadmap, and changelog. Inspect package manifests, workspace config, lockfile, workflows, and actual tests before edits.

## Next Task

Sprint 0.4 — Core Domain Foundation and Architecture Enforcement: establish domain module boundaries, canonical identifiers, exact numeric and UTC primitives, result/error and event/provenance/idempotency envelopes, dependency/architecture tests, and a database schema design baseline. Implement no scanner, external integration, or trading.

## Output and Validation Rules

Repository artifacts are English; requested user sprint reports are Turkish. Preserve strict typing and meaningful assertions. Run relevant frozen-install, format, lint, typecheck, unit/integration/E2E, build, docs/workspace, audit, secret, whitespace, and Git checks. Never report skipped or failed work as passed.

## Evidence and Assumption Rules

Repository evidence overrides chat. Verify unstable versions, licenses, advisories, APIs, and support against official sources. Do not invent runtime status, provider behavior, performance, cloud configuration, or product capability. Label unknowns and deferred work.

## Repository-First and Sprint-Close Rules

Do not modify anything before reading branch/status/history/state and applicable decisions. Every sprint closes by updating PROJECT_SESSION_STATE.md, AI_HANDOFF.md, CHANGELOG.md, and every materially affected specification, memory, protocol, architecture, standard, roadmap, ADR, and version file.
