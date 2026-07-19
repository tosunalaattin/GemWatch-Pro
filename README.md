# GemWatch Pro

GemWatch Pro is a planned modular on-chain intelligence platform. The repository currently provides a development platform and health-only application shells; it contains no token discovery, scoring, provider integration, paper trading, wallet, or trade implementation.

## Current Status

Sprint 0.3 bootstrapped the modular-monolith workspace with a React/Vite web shell, Fastify API shell, worker shell, shared foundation packages, local PostgreSQL/Redis infrastructure, and CI/security gates. Sprint 0.3.1 validated and stabilized that platform with real dependency, fault-recovery, worker, browser, and hosted CI runs. Product version is `0.0.4`; the engineering specification remains `0.3.0`.

> **Live trading is disabled and not implemented.** Scores and future AI analysis are decision-support signals, not guarantees or independent transaction authorization.

## Prerequisites

- Git
- Node.js `24.18.0` LTS recommended (`>=24.14.0 <25` accepted for local verification)
- pnpm `11.15.0`, activated from the `packageManager` declaration through Corepack
- Docker Desktop with Docker Compose for local PostgreSQL/Redis and integration tests

Do not replace the pinned package manager or commit another lockfile. On Windows, use PowerShell, Command Prompt, or WSL2 consistently for one install.

## Initial Setup

```bash
corepack enable
corepack install --global pnpm@11.15.0
pnpm install --frozen-lockfile
```

Copy `.env.example` to `.env` for local use. The tracked example contains local-only credentials; never reuse them in shared or production environments.

## Local Development

```bash
pnpm infra:up
pnpm dev
```

Individual processes are available through `pnpm dev:web`, `pnpm dev:api`, and `pnpm dev:worker`. The API defaults to `127.0.0.1:3000`; the web shell defaults to `127.0.0.1:5173`. Override host ports with `POSTGRES_HOST_PORT` and `REDIS_HOST_PORT` when local ports conflict.

## Build, Test, and Security

```bash
pnpm build
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm security:audit
pnpm security:secrets
pnpm check
```

Integration tests require Docker and run only with `RUN_INTEGRATION_TESTS=true`. Playwright requires its Chromium binary. `pnpm check` runs format, lint, strict type checking, unit tests, build, documentation validation, and workspace validation in that order.

## Health Endpoints

- `GET /health`: process/API health without dependency checks
- `GET /health/live`: liveness
- `GET /health/ready`: PostgreSQL and Redis readiness; returns non-2xx when either is unavailable

Responses use the versioned shared health contract, UTC timestamps, correlation identifiers, and redacted dependency states.

## Repository Map

- `apps/web`: minimal status UI
- `apps/api`: Fastify health/readiness API
- `services/worker`: dependency-aware worker lifecycle shell; no domain jobs
- `packages`: contracts, domain primitives, configuration, observability, and testing foundations
- `services/*`: preserved future bounded-context placeholders
- `infrastructure`: local Compose assets and repository validation scripts
- `tests`: integration, end-to-end, and fixture boundaries
- `docs`: source-of-truth specification, decisions, state, standards, and handoff

## Start Reading Here

1. [Project Session State](docs/PROJECT_SESSION_STATE.md)
2. [AI Handoff](docs/AI_HANDOFF.md)
3. [AI Memory](docs/AI_MEMORY.md)
4. [Engineering Specification](docs/GemWatch_Engineering_Specification.md)
5. [Architecture](docs/ARCHITECTURE.md)
6. [Local Development Guide](docs/LOCAL_DEVELOPMENT_GUIDE.md)
7. [Dependency Inventory](docs/DEPENDENCY_INVENTORY.md)
8. [Roadmap](docs/ROADMAP.md)
9. [Changelog](docs/CHANGELOG.md)

## Troubleshooting

- A Node/pnpm engine error means the pinned runtime policy is not active; verify `node --version` and `pnpm --version`.
- Port conflicts are resolved through the host-port variables, not by editing committed Compose defaults.
- If readiness is degraded, run `pnpm infra:logs` and check both Compose health states.
- `pnpm infra:reset -- --confirm-local-data-loss` deletes only local named volumes and is intentionally guarded.
- Docker Desktop must be running for integration tests. WSL2 users should keep the repository inside one filesystem to avoid slow cross-filesystem I/O.

## Safety, License, and Contributions

Crypto systems carry substantial technical and financial risk. No profitability claim is made. A future Trade Engine must never bypass the Risk Manager, and validated paper trading must precede any controlled live stage.

Licensed under [Apache License 2.0](LICENSE). Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.
