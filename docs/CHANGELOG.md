# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project intends to use semantic versioning when releasable software exists.

## [Unreleased]

## [0.0.4] - 2026-07-19

### Fixed

- Restricted PostgreSQL and Redis host publishing to loopback and corrected local Redis host-client readiness behavior.
- Replaced watcher-based Playwright startup with deterministic API build/start and web build/preview commands using explicit health URLs and child-process cleanup.
- Removed deprecated `.eslintignore` usage and consolidated generated-output ignores in ESLint flat config.

### Changed

- Upgraded the SHA-pinned pnpm setup action to Node.js 24-compatible v6.0.8.
- Expanded integration coverage for bounded dependency timeouts, redacted failures, and production-like database credential rejection.

### Validated

- Docker Desktop Linux engine, image pulls, Compose health, random-port Testcontainers, API dependency fault/recovery, worker heartbeat and SIGINT/SIGTERM shutdown, Chromium smoke flow, and hosted GitHub Actions runs.

### Documentation

- Recorded the actual Docker, OneDrive, health, dependency, E2E, CI, state, and handoff results from Sprint 0.3.1.

## [0.0.3] - 2026-07-19

### Added

- React/Vite status shell, Fastify health API, worker lifecycle shell, and five private foundation packages.
- Versioned runtime-validated health contract, configuration parsing, redacted structured logging, and disabled-by-default OpenTelemetry bootstrap.

### Changed

- Product/specification versions advanced to 0.0.3/0.3.0 and living documentation now reflects the working platform.

### Security

- Added fail-fast environment validation, live-trading false enforcement, CORS allowlist, security headers, safe errors, rate limit, secret redaction/scanning, dependency audit, and explicit pnpm build-script policy.

### Infrastructure

- Added pnpm/Turborepo workspace, exact lockfile, local PostgreSQL/Redis Compose services, health checks, volumes, isolated network, and guarded destructive reset.

### Testing

- Added unit/API/web/worker tests, Testcontainers integration direction, Playwright smoke test, and CI quality/integration/E2E jobs.

### Documentation

- Added local development, CI security, environment, health/readiness, and dependency inventory documents and synchronized living standards/state/handoff.

## [0.0.2] - 2026-07-19

### Added

- Comparative technology evaluation, weighted decision matrix, system/data/event/observability/development/AWS architecture documents.
- ADR-0002 through ADR-0019 covering architecture, stack, data, messaging, security, testing, CI, deployment, identity, precision, and time.

### Changed

- Product baseline to 0.0.2 and engineering specification to 0.2.0.
- Living documentation, roadmap, standards, session state, AI handoff/memory, and resume protocol for the selected initial stack and Sprint 0.3.

### Security

- Locked exact numeric/UTC policy, managed authentication boundary, provider/chain adapter isolation, outbox/idempotency, telemetry redaction, CI least privilege, and isolated AWS staging rules.
- Preserved Risk Manager non-bypass, paper-before-live, live-disabled-by-default, secret isolation, and AI non-authorization rules.

### Architecture

- Accepted modular-monolith-first with TypeScript/Node.js LTS, React/Vite, Fastify, pnpm/Turborepo, PostgreSQL/Drizzle, Redis/BullMQ, REST/OpenAPI/WebSocket, OpenTelemetry, and layered testing.
- Defined isolated Compose staging and ECS Fargate/managed-data production direction without deploying resources.

## [0.0.1] - 2026-07-19

### Added

- Initial monorepo directory skeleton for future applications, services, shared packages, infrastructure, and tests.
- Living engineering specification version 0.1.0, conceptual architecture diagrams, and phased roadmap.
- Project session state, AI handoff, persistent AI memory, and reusable AI working protocol.
- Technology-independent coding, API, database, security, testing, deployment, Git, and documentation standards.
- ADR process and ADR-0001 establishing the repository as the single source of truth.
- GitHub issue and pull request templates, contribution guidance, repository formatting and ignore policies.
- Apache License 2.0 and repository version baseline 0.0.1.
