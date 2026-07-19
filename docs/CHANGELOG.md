# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project intends to use semantic versioning when releasable software exists.

## [Unreleased]

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
