# Development Platform

## Status

The development-platform baseline was implemented in Sprint 0.3. Product/domain functionality remains deferred.

## Required Developer Tools

- Git with repository-local identity already configured and GitHub access.
- A current supported Node.js LTS selected and pinned by repository policy in Sprint 0.3.
- Corepack or the documented official installation mechanism for the repository-pinned pnpm release.
- Docker Desktop on Windows using Linux containers; WSL2 backend is recommended where supported.
- A code editor with EditorConfig, TypeScript, ESLint, and formatting integration.
- PowerShell supported for root commands; shell-specific scripts must not be the only path.
- Optional WSL2 Linux environment for closer Linux parity, not a prerequisite for basic work.

## Runtime Management

Repository files will declare the supported Node major/range and package-manager release. A cross-platform version manager may be documented, but the repository must not depend on one proprietary manager. CI and containers use the same supported major. Unsupported/EOL Node releases fail setup checks.

## Package Manager Policy

pnpm is the only package manager. Commit exactly one pnpm lockfile. CI uses frozen-lockfile installs; lockfile changes require manifest changes and review. npm/yarn lockfiles are prohibited. Install scripts are treated as code, minimized, and reviewed. Dependency overrides/patches include rationale and removal condition.

## Workspace Structure

- apps/web: React/Vite SPA.
- apps/api: Fastify composition root and HTTP/WebSocket boundary.
- services/*: bounded-context application adapters/workers; directory names do not require independent deployments.
- packages/contracts: OpenAPI/event/provider-neutral schemas and generated-safe types.
- packages/domain: framework/provider-independent domain modules.
- packages/config: typed configuration schema and loaders without secrets.
- packages/observability: correlation, logging, OTel, health, and redaction helpers.
- packages/testing: clocks, fixtures, builders, contract helpers, and safe test utilities.
- infrastructure: Compose, deployment, monitoring, and scripts.
- tests: cross-boundary integration, end-to-end, and fixtures.

Import boundaries will be enforced with TypeScript project references/path policy, ESLint dependency rules or an evaluated equivalent, and architecture tests. Apps compose packages; domain never imports apps, Fastify, Drizzle, Redis/BullMQ, AWS, Cognito, chain SDKs, or provider SDKs.

## Task Execution

Turborepo orchestrates named root tasks over package scripts. Required task directions: setup/check prerequisites, dev, build, format/check, lint, typecheck, test:unit, test:integration, test:e2e, test:contract, test:security, db:migration:generate/check/apply, docs:check, dependency:check, secret:scan, and ci. Exact names are finalized in Sprint 0.3. Cache inputs include source, configs, environment allowlists, schemas, migrations, and lockfile; secret values never enter cache keys/artifacts.

## Environment Configuration

Configuration is schema-validated at startup and separated by local, test, development, staging, and production. Defaults are safe and must not enable live trading. Precedence and required fields are documented. Unknown variables fail or warn by policy. Secrets are referenced, not committed; logs show names/status only, never values.

## .env.example Policy

Each runnable application may have a tracked .env.example containing variable name, purpose, safe dummy value, required/optional status, environment scope, and sensitivity note. It contains no working credential, wallet, provider key, secret-like random string, or real infrastructure address. Actual .env files remain ignored. Examples default to local mock/sandbox endpoints and live trading disabled.

## Docker Compose Services

Sprint 0.3 creates a development Compose profile for PostgreSQL and Redis with health checks, named volumes, local-only port bindings, non-production credentials, isolated network, resource guidance, and deterministic initialization. Optional profiles may later add an OTel Collector or local telemetry backend. Application processes run natively by default; CI can use service containers/Testcontainers. Compose is not a production-readiness claim.

## Local and Test Databases

Local development and automated tests never use staging/production databases. Testcontainers creates isolated PostgreSQL/Redis instances for integration suites. Each test suite owns cleanup and uses unique databases/schemas/keys. Migration tests cover empty install and supported upgrade. Seeds are explicit, repeatable, non-sensitive, and never run automatically in production.

## Fixtures

Fixtures are synthetic, licensed, minimized, redacted, immutable/versioned, and identify source constraints. Provider/chain raw samples are bounded and malicious-content safe. Deterministic clocks, IDs, randomness seeds, block lineage, reorgs, rate limits, errors, duplicates, and stale data are represented. No mainnet calls are required for default tests.

## One-Command Target

The target developer flow is one documented root bootstrap command after prerequisites, followed by one root development command. Bootstrap verifies versions, installs with the lockfile, starts/health-checks infrastructure, applies local migrations, and validates setup without generating secrets. Destructive resets are separate, explicit, and recoverable.

## Windows and WSL2

Root tasks use Node-based cross-platform tooling where possible, LF repository files, normalized paths, and no Bash-only assumptions. Docker Desktop's WSL2 backend is recommended. If working inside WSL, keep the repository in a performant Linux filesystem when appropriate and document OneDrive/symlink/watcher limitations. Windows PowerShell remains a supported control path.

## Quality Tooling Direction

- Formatting: Prettier for supported source/config/Markdown plus EditorConfig; generated/third-party artifacts excluded deliberately.
- Linting: ESLint flat configuration with TypeScript-aware rules and module-boundary rules.
- Type checking: strict TypeScript, no emit for checks, project references as justified.
- Unit/integration: Vitest; Fastify injection for API boundary; Testcontainers for PostgreSQL/Redis.
- Browser/e2e: Playwright with a minimal CI browser first and scheduled/full matrix later.
- Build: Vite web build and TypeScript/backend container-ready artifact strategy selected in Sprint 0.3.
- Documentation: Markdown links, headings, Mermaid fences, ADR sequence, versions, and required-state checks.
- Security: secret scanner, dependency audit/review, license policy, static checks, and container scan when images exist.

## Dependency Management

Dependencies require a clear owner/use case, maintained source, compatible license, supported runtime, security review, and avoidance of duplicate libraries. Runtime dependencies are minimized. Automated update PRs may be enabled with grouped low-risk changes, CI evidence, and human review. Security updates receive risk-based priority; major upgrades require migration notes.

## Version and Lockfile Policy

Use supported major-version policies in ADRs and exact reproducibility in the lockfile/container digests. Sprint 0.3 pins Node, pnpm, direct dependencies, test browsers/images, and CI action commits. Lockfile modifications are never hand-edited. Container tags used for repeatable CI/deployment resolve to reviewed digests where practical.

## Local Secret Policy

Use non-production, minimum-scope credentials outside Git. Prefer local fake/sandbox providers. Never place secrets in command history, screenshots, fixtures, logs, AI prompts, issue text, or Turbo cache. Provide rotation/revocation instructions for accidental exposure. Wallet keys and seed phrases are prohibited from the development platform at this phase.

## Sprint 0.3 Bootstrap List

1. Pin supported Node LTS and pnpm.
2. Add root package/workspace/Turborepo/TypeScript configurations and root scripts.
3. Add Prettier, ESLint, strict typecheck, Vitest, documentation checks, and safe dependency/secret baselines.
4. Create minimal manifests for apps/web, apps/api, shared packages, and selected worker boundaries without domain features.
5. Bootstrap React/Vite and Fastify **health-check-only** applications.
6. Add PostgreSQL/Redis Docker Compose development services and tracked environment templates.
7. Add Drizzle configuration and a migration-validation skeleton without product schema.
8. Add Testcontainers smoke integration and Playwright health-page smoke test.
9. Add structured logging, correlation, minimal OTel/health scaffolding.
10. Add a base GitHub Actions quality workflow with least privilege and pinned actions.
11. Document Windows/WSL2 setup, one-command target, troubleshooting, and cleanup.
12. Validate clean bootstrap, repeat install, build/test, no domain behavior, and no live capability.

The list is implemented with Node 24/pnpm 11 policy, an exact lockfile, Turborepo, strict TypeScript/ESLint/Prettier, layered tests, local PostgreSQL/Redis, safe configuration, health-only shells, and read-only GitHub Actions. Sprint 0.3.1 validated the Docker Desktop Linux engine, disposable integration resources, runtime dependency recovery, worker lifecycle, deterministic browser smoke startup, and successful hosted workflows. Compose dependency ports are host-loopback-only and no application source directory is bind-mounted. See [Local Development Guide](LOCAL_DEVELOPMENT_GUIDE.md) and [Dependency Inventory](DEPENDENCY_INVENTORY.md).
