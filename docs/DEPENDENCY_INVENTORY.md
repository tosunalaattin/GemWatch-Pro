# Dependency Inventory

Versions are exact in manifests and fully resolved by `pnpm-lock.yaml`. Sources are official npm package records unless an image/action source is named. Internal packages are private and use `workspace:*`. Replacement requires review and an ADR when architectural.

| Package/group | Purpose | Workspace | Class | License | Version policy | Security/replacement notes |
| --- | --- | --- | --- | --- | --- | --- |
| Node.js | Runtime | all | runtime | MIT | `.nvmrc` 24.18.0 LTS; engine >=24.14 <25 | Stay on supported LTS/security patches |
| pnpm / Turborepo | install and task graph | root | dev | MIT | 11.15.0 / 2.10.5 exact | One frozen lock; replace only via ADR |
| TypeScript | strict compiler | all | dev | Apache-2.0 | 6.0.3 exact | Upgrade with ESLint/Vite compatibility test |
| ESLint toolchain | typed flat lint, React/hooks/import/promise rules | root | dev | MIT/ISC | 9.39.5 and exact plugins | ESLint 9 retained for React plugin peer support |
| Prettier | source/config formatting | root | dev | MIT | 3.9.5 exact | Formatting only; Markdown validated separately |
| React / React DOM | status shell | web | runtime | MIT | 19.2.7 exact | No UI framework/state/router added |
| Vite / React plugin | web dev/build | web | dev | MIT | 8.1.5 / 6.0.3 exact | Node 24-compatible supported line |
| Testing Library / jsdom | web unit tests | web | dev | MIT | exact | Test-only; never browser production dependency |
| Fastify | HTTP boundary | API | runtime | MIT | 5.10.0 exact | Domain remains framework-independent |
| Fastify cors/helmet/rate-limit/swagger/swagger-ui | API boundary controls and OpenAPI | API | runtime | MIT | exact | Swagger UI disabled in production; no wildcard CORS |
| Zod | runtime contracts/config | contracts/config | runtime | MIT | 4.4.3 exact | Validate untrusted boundaries; schemas reviewed |
| Pino | structured redacted logs | observability | runtime | MIT | 10.3.1 exact | Raw body/auth/credentials prohibited |
| OpenTelemetry API/SDK/OTLP exporter | vendor-neutral telemetry | observability | runtime | Apache-2.0 | 1.9.1 / 0.220.0 exact | Disabled by default; backend deferred |
| Drizzle ORM / postgres | PostgreSQL client and health query | API | runtime | Apache-2.0 / Unlicense | 0.45.2 / 3.4.9 exact | No schema, migration, or startup mutation |
| ioredis | Redis lifecycle and PING | API/worker | runtime | MIT | 5.11.1 exact | Redis is non-authoritative; URLs redacted |
| BullMQ | accepted future job adapter dependency | worker | runtime | MIT | 5.79.0 exact | No queue processor/job exists; outbox/idempotency still mandatory |
| Vitest | unit/integration runner | workspaces | dev | MIT | 4.1.10 exact | Deterministic tests; real funds prohibited |
| Testcontainers PostgreSQL/core | disposable integration services | root/tests | dev | MIT | 12.0.4 exact | Reuse off; production credentials guarded |
| Playwright | Chromium smoke test | root/tests | dev | Apache-2.0 | 1.61.1 exact | Browser binary installed only where required |
| PostgreSQL image | local transactional dependency | Compose/CI | runtime infrastructure | PostgreSQL License | `18.4-trixie` exact | Local/CI only; no domain schema |
| Redis image | local ephemeral dependency | Compose/CI | runtime infrastructure | BSD-3-Clause for 7.2 line | `7.2.14-alpine3.21` exact | Selected over Redis 8 licensing change; reassess support/security |
| actions/checkout / setup-node / pnpm action-setup | CI bootstrap | GitHub Actions | CI | MIT | full commit SHA, v6/v4 lines | Official upstream actions, read-only, credentials not persisted |

`@types/node`, `@types/react`, `@types/react-dom`, and `tsx` are exact development-only typing/runner dependencies under their published MIT licenses. Transitive packages and integrity hashes are recorded in the lockfile rather than duplicated here. One transitive deprecated `glob@10.5.0` was observed during install and remains an external update risk.
