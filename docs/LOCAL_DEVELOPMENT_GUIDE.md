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

Sprint 0.3.1 verified the complete flow on Windows with Docker Desktop's `desktop-linux` context. PostgreSQL and Redis publish only on host loopback. Integration tests use disposable Testcontainers with random host ports by default; Compose services are used for runtime readiness and fault-recovery checks. Playwright builds the API and web applications, starts the API production entry point and Vite preview server separately, waits on explicit URLs, and terminates both child processes after the smoke test.

## Troubleshooting

- Use `pnpm infra:logs` for dependency startup or health failures.
- Override local conflicts with `POSTGRES_HOST_PORT` or `REDIS_HOST_PORT`; keep container ports unchanged.
- Docker Desktop must expose the Linux engine. A client-only version is not sufficient.
- Confirm `docker context show` returns `desktop-linux` when Docker Desktop is the intended engine. Named-pipe access failures are permission/context failures, not image-pull failures.
- WSL2 users should run Git, Node, pnpm, and the repository from the same OS/filesystem context.
- OneDrive caused no container bind-mount or Playwright correctness failure in Sprint 0.3.1, but filesystem writes and cold starts were intermittently slow. If that persists, prefer a non-synchronized path such as `C:\Projects\GemWatch-Pro`; never move the repository during an active task without owner approval.
- If generated output is stale, run `pnpm clean`, reinstall with the frozen lockfile, and rebuild.

## Reset Procedure

`pnpm infra:reset` refuses to run without confirmation. `pnpm infra:reset -- --confirm-local-data-loss` stops Compose and deletes only GemWatch Pro local named volumes. This is destructive and cannot recover local PostgreSQL/Redis data. It must never be used in CI or a shared environment.
