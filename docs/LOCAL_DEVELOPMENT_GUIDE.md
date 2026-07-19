# Local Development Guide

## Prerequisites

Windows developers need Git, Node.js 24 LTS, pnpm 11.15.0 through Corepack, and Docker Desktop with WSL2 integration where applicable. Docker is required for PostgreSQL, Redis, integration tests, and the full local readiness path. No global tool other than the selected runtime/package manager is required.

## Clone and Install

```bash
git clone https://github.com/tosunalaattin/GemWatch-Pro.git
cd GemWatch-Pro
corepack enable
corepack install --global pnpm@11.15.0
pnpm install --frozen-lockfile
```

Do not use npm, Yarn, or Bun to install dependencies. The single `pnpm-lock.yaml` is authoritative.

## Environment

Copy `.env.example` to `.env`. Values are local-only and must not be used in shared environments. Server credentials never use a `VITE_` prefix; browser variables must be public and non-sensitive. See [Environment Configuration](ENVIRONMENT_CONFIGURATION.md).

## Start and Stop

```bash
pnpm infra:up
pnpm dev:api
pnpm dev:web
pnpm dev:worker
```

Use `pnpm dev` for all three Node processes. Stop foreground processes with Ctrl+C and stop infrastructure with `pnpm infra:down`. The API and worker handle SIGINT/SIGTERM and close connections/telemetry before exit.

## Verification

```bash
pnpm check
pnpm security:audit
pnpm security:secrets
```

For real infrastructure tests set `RUN_INTEGRATION_TESTS=true` before `pnpm test:integration`. For browser smoke tests install the supported Chromium binary with `pnpm exec playwright install chromium`, then run `pnpm test:e2e`.

## Troubleshooting

- Use `pnpm infra:logs` for dependency startup or health failures.
- Override local conflicts with `POSTGRES_HOST_PORT` or `REDIS_HOST_PORT`; keep container ports unchanged.
- Docker Desktop must expose the Linux engine. A client-only version is not sufficient.
- WSL2 users should run Git, Node, pnpm, and the repository from the same OS/filesystem context.
- If generated output is stale, run `pnpm clean`, reinstall with the frozen lockfile, and rebuild.

## Reset Procedure

`pnpm infra:reset` refuses to run without confirmation. `pnpm infra:reset -- --confirm-local-data-loss` stops Compose and deletes only GemWatch Pro local named volumes. This is destructive and cannot recover local PostgreSQL/Redis data. It must never be used in CI or a shared environment.
