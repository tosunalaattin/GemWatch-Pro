# GemWatch Pro

GemWatch Pro is a planned modular on-chain alpha intelligence platform for discovering newly created or newly liquid tokens, aggregating market and on-chain evidence, assessing security and potential, and supporting controlled trading workflows.

## Current Status

The project is in the architecture and development-platform specification stage. Sprint 0.2 selected the initial technical architecture, but application code, production deployment, paper trading, wallet integration, and live trading have not started. Live trading is disabled and not implemented.

## Initial Architecture

The accepted starting direction is a modular monolith implemented primarily in TypeScript on a supported Node.js LTS line, with React/Vite, Fastify, pnpm/Turborepo, PostgreSQL/Drizzle, Redis/BullMQ, REST/OpenAPI plus WebSocket, OpenTelemetry, and a Docker Compose-based local platform. AWS staging and production directions are documented separately. Exact dependency versions will be pinned during Sprint 0.3.

## Capability Vision

The long-term vision includes token and liquidity discovery, provider-adapted market and on-chain ingestion, contract and wallet intelligence, risk and potential scoring, backtesting, paper trading, notifications, observability, and eventually risk-gated execution across multiple chains.

## Safety and Financial Risk

Crypto assets and automated execution involve substantial technical and financial risk. Scores and AI-assisted analysis are decision-support signals, not guarantees or independent trading authorization. No claim of profitability is made. A future Trade Engine must never bypass the Risk Manager, and real-money trading may only follow validated backtesting, paper trading, and controlled live-test gates.

## Repository Map

- `apps/`: future user-facing and API application boundaries.
- `services/`: future domain services and execution components.
- `packages/`: future shared contracts, domain, configuration, observability, and testing assets.
- `infrastructure/`: future deployment, monitoring, Docker, and operational scripts.
- `docs/`: specification, architecture, standards, decisions, state, and AI handoff material.
- `tests/`: future integration, end-to-end, and fixture assets.

## Start Reading Here

1. [Project Session State](docs/PROJECT_SESSION_STATE.md)
2. [AI Handoff](docs/AI_HANDOFF.md)
3. [AI Memory](docs/AI_MEMORY.md)
4. [Engineering Specification](docs/GemWatch_Engineering_Specification.md)
5. [Architecture](docs/ARCHITECTURE.md)
6. [Technology Evaluation](docs/TECHNOLOGY_EVALUATION.md)
7. [System Boundaries](docs/SYSTEM_BOUNDARIES.md)
8. [Development Platform](docs/DEVELOPMENT_PLATFORM.md)
9. [Roadmap](docs/ROADMAP.md)
10. [Changelog](docs/CHANGELOG.md)

## Development Workflow

Read the current state and applicable standards, create a focused branch, document architectural decisions before implementation, make small atomic changes, validate them, and update state, changelog, and handoff documents at sprint close. See [Contributing](CONTRIBUTING.md) and [Git Workflow](docs/GIT_WORKFLOW.md).

## License

Licensed under the [Apache License 2.0](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change.
