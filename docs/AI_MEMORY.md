# AI Memory

These records are persistent constraints. Changes require explicit review, synchronized documentation, and an ADR when architectural.

## MEM-001: GitHub Repository Is the Source of Truth

- **Decision:** Code, technical documentation, project state, and AI handoff knowledge are authoritative only when stored in the repository.
- **Rationale:** Chat history and local recollection are incomplete and non-durable.
- **Consequences:** Inspect Git before work; persist outcomes and reject conflicting chat claims.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-002: Documentation Precedes Implementation

- **Decision:** Material architecture and behavioral intent must be documented before application code implements them.
- **Rationale:** Reviewable intent reduces accidental coupling and hidden decisions.
- **Consequences:** Update specifications or ADRs first; undocumented design is not approved.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-003: Provider Integrations Require Adapters

- **Decision:** External providers must connect through provider adapters rather than directly to business logic.
- **Rationale:** Providers differ in schemas, quality, limits, availability, and lifecycle.
- **Consequences:** Internal contracts remain provider-neutral and integrations expose provenance and failure.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-004: Risk Manager Cannot Be Bypassed

- **Decision:** The Trade Engine must never execute an intent that has not passed the Risk Manager path.
- **Rationale:** Central, auditable enforcement is required for financial safety.
- **Consequences:** Bypass paths are prohibited; gate failure denies execution and is audited.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-005: Paper Trading Precedes Live Trading

- **Decision:** Validated paper trading is a mandatory predecessor to any live trading stage.
- **Rationale:** Strategies and operational controls need evidence without risking capital.
- **Consequences:** Live work cannot advance without documented paper-trading exit evidence.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-006: Live Trading Is Opt-In and Disabled by Default

- **Decision:** Live trading requires explicit enablement and is off by default in every environment and new configuration.
- **Rationale:** Safe defaults reduce accidental transaction risk.
- **Consequences:** Missing, ambiguous, or invalid configuration must not enable execution.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-007: Secrets Never Enter the Repository

- **Decision:** API secrets, private keys, seed phrases, credentials, and sensitive certificates must not be committed.
- **Rationale:** Git history is durable and broadly replicated.
- **Consequences:** Use approved secret stores, redacted logs, scanners, and trackable examples without values.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-008: AI Output Cannot Independently Authorize a Trade

- **Decision:** AI analysis alone cannot approve, sign, or submit a transaction.
- **Rationale:** Model output is probabilistic and susceptible to bad or adversarial context.
- **Consequences:** AI remains advisory and all execution gates remain independently enforced.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-009: Scores Are Decision-Support Signals, Not Guarantees

- **Decision:** Risk, Potential, and Alpha scores inform ranking and review but promise no result.
- **Rationale:** Markets and source evidence are uncertain and non-stationary.
- **Consequences:** Scores require explanations, versions, validation, uncertainty, and non-guarantee language.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-010: Each Sprint Closes with Documentation and State Updates

- **Decision:** Sprint closure updates state, changelog, handoff, and every materially affected living document.
- **Rationale:** The repository must remain resumable without chat history.
- **Consequences:** A sprint is not complete while its repository narrative is stale or contradictory.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-011: External Security Data Must Be Corroborated Where Practical

- **Decision:** Security conclusions must not depend uncritically on one external source and should be corroborated where practical.
- **Rationale:** Providers can be stale, unavailable, incomplete, or wrong.
- **Consequences:** Preserve provenance, conflicts, freshness, missing data, and independent evidence.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-012: Technology Choices Require Explicit ADRs

- **Decision:** Material choices of language, framework, persistence, messaging, deployment, chain, or provider require accepted ADRs.
- **Rationale:** Technology has long-lived operational and security consequences.
- **Consequences:** Placeholders and proposals are not selections; compare options and document decisions.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-013: Modular Monolith First

- **Decision:** Start with explicit bounded contexts in one backend artifact; API and workers may run separately, and extraction requires evidence.
- **Rationale:** It preserves safety boundaries without premature distributed operations.
- **Consequences:** Enforce module dependencies and public contracts in code/tests.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0002](adr/ADR-0002-modular-monolith-first.md)

## MEM-014: TypeScript and Node.js LTS

- **Decision:** Use TypeScript on a current supported Node.js LTS line as the initial primary runtime.
- **Rationale:** Shared web/backend contracts and mature real-time/web3 tooling best fit the initial team.
- **Consequences:** Runtime validation, supply-chain gates, exact numeric types, and CPU-worker isolation are mandatory.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0003](adr/ADR-0003-primary-language-and-runtime.md)

## MEM-015: React and Vite Web Stack

- **Decision:** Build the authenticated SPA with React and Vite.
- **Rationale:** The dashboard is interactive, real-time, chart/table heavy, and not SEO-led.
- **Consequences:** Static assets use APIs only; browser security/accessibility/bundle tests are required.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0004](adr/ADR-0004-web-application-stack.md)

## MEM-016: Fastify API Boundary

- **Decision:** Use Fastify for schema-first HTTP/WebSocket composition while keeping domain code framework-independent.
- **Rationale:** Validation, serialization, logging, testing, and a small framework surface align with the boundary.
- **Consequences:** Schemas are trusted code; errors/redaction and output schemas are governed.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0005](adr/ADR-0005-backend-framework.md)

## MEM-017: pnpm Workspaces and Turborepo

- **Decision:** Use pnpm as the sole package manager and Turborepo as the task orchestrator.
- **Rationale:** Strict efficient workspaces and a simple task graph balance productivity and governance.
- **Consequences:** One frozen lockfile, reviewed scripts, correct cache inputs, and no mixed managers.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0006](adr/ADR-0006-monorepo-and-package-management.md)

## MEM-018: PostgreSQL Primary Database

- **Decision:** PostgreSQL is the transactional source of truth.
- **Rationale:** ACID, exact numeric, constraints, JSONB, indexing, partition direction, and AWS support fit the data.
- **Consequences:** High-volume/raw data needs retention/partition/object-storage controls; Redis is not authoritative.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0007](adr/ADR-0007-primary-database.md)

## MEM-019: Drizzle and Reviewed SQL Migrations

- **Decision:** Use Drizzle with generated, committed, reviewed, tested SQL migrations.
- **Rationale:** Type safety with visible SQL and raw control suits data-intensive PostgreSQL work.
- **Consequences:** No shared-environment schema push, automatic synchronization, or startup migration.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0008](adr/ADR-0008-data-access-and-migrations.md)

## MEM-020: Redis for Ephemeral State

- **Decision:** Redis serves shared cache, rate limits, sessions, temporary provider state, fan-out, and job coordination.
- **Rationale:** TTL and low-latency shared operations should not burden the primary database.
- **Consequences:** Redis data is reconstructable; locks alone cannot authorize irreversible actions.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0009](adr/ADR-0009-cache-and-ephemeral-state.md)

## MEM-021: BullMQ with Outbox and Idempotency

- **Decision:** Use BullMQ behind a job port, PostgreSQL transactional outbox, at-least-once/idempotent consumers, bounded retry, and quarantine.
- **Rationale:** It reuses Redis and fits initial Node/local operations while preserving broker exit.
- **Consequences:** Duplicate/failure/replay behavior must be tested; SQS remains reviewable for production.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0010](adr/ADR-0010-asynchronous-jobs-and-messaging.md)

## MEM-022: REST, OpenAPI, and WebSocket

- **Decision:** REST/OpenAPI handles resource/command/query APIs and WebSocket handles bidirectional real-time updates; SSE is allowed for one-way feeds.
- **Rationale:** Mature explicit contracts fit dashboard and operational workflows without initial GraphQL complexity.
- **Consequences:** Authorization/versioning/backpressure apply to every transport and subscription.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0011](adr/ADR-0011-api-and-realtime-communication.md)

## MEM-023: Chain and Provider Adapter Contract

- **Decision:** Chain/RPC/WebSocket and every external provider category implement internal normalized adapters with provenance, freshness, health, retry, timeout, circuit, and raw references.
- **Rationale:** External evidence is untrusted, variable, and must remain replaceable/corroborated.
- **Consequences:** SDK types stay in adapters; no chain/provider is selected by this decision.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0012](adr/ADR-0012-provider-adapter-architecture.md)

## MEM-024: OpenTelemetry and Structured JSON Logs

- **Decision:** Use OTel traces/metrics and correlated structured JSON logs; audit remains separate.
- **Rationale:** Vendor-neutral diagnostics are required across API, providers, queues, and decisions.
- **Consequences:** Redaction, cardinality, sampling, retention, cost, and evolving JS log support are governed.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0013](adr/ADR-0013-observability-stack.md)

## MEM-025: Layered TypeScript Testing

- **Decision:** Use Vitest, Fastify injection, Testcontainers, Playwright, contract fixtures, deterministic clocks, and later specialized security/load/replay validation.
- **Rationale:** Unit speed plus real infrastructure/browser evidence best fits the risks.
- **Consequences:** Tests never use real funds or uncontrolled production/mainnet mutation.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0014](adr/ADR-0014-testing-strategy-and-tooling.md)

## MEM-026: Mixed Local Development

- **Decision:** Run Node/pnpm natively and PostgreSQL/Redis in Docker Compose; support Windows and optional WSL2.
- **Rationale:** This provides a fast debug loop with reproducible stateful services.
- **Consequences:** Local ports, volumes, secrets, cleanup, and one-command setup are explicitly controlled.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0015](adr/ADR-0015-local-development-platform.md)

## MEM-027: GitHub Actions CI

- **Decision:** Use managed GitHub Actions with least privilege and required quality/security gates.
- **Rationale:** It aligns CI with repository truth without operating runners.
- **Consequences:** Pin actions, protect main/environments, use OIDC, and avoid long-lived cloud credentials.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0016](adr/ADR-0016-continuous-integration-strategy.md)

## MEM-028: AWS Staging and Production Direction

- **Decision:** Isolated Compose on the existing AWS host is staging-only; production direction is ECS Fargate plus managed data/secrets/object storage.
- **Rationale:** Reuse capacity safely for staging while reserving stronger production isolation/scale.
- **Consequences:** Astro Sling isolation, backups, monitoring, rollback, cost, and production gates are mandatory.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0017](adr/ADR-0017-aws-deployment-strategy.md)

## MEM-029: Cognito Identity and Application Authorization

- **Decision:** Use Cognito OIDC authorization-code + PKCE for identity; the application owns roles/capabilities and future step-up controls.
- **Rationale:** Avoid application-managed passwords while keeping domain authorization explicit.
- **Consequences:** No implicit flow or identity-to-trade shortcut; audit, revocation, MFA readiness, and lockout are required.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0018](adr/ADR-0018-authentication-and-authorization-boundary.md)

## MEM-030: Exact Numeric and UTC Time

- **Decision:** Use raw integers/exact decimals, versioned rounding, UTC timestamps, separate source/chain and ingestion/processing/decision times, and monotonic durations.
- **Rationale:** Financial correctness and deterministic replay prohibit ambiguous floats/time.
- **Consequences:** JavaScript number cannot drive token/financial decisions; boundary/database mappings are explicit.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related ADR:** [ADR-0019](adr/ADR-0019-numeric-precision-and-time-policy.md)

## MEM-031: Pinned Runtime and Dependency Policy

- **Decision:** Recommend Node 24.18.0 LTS, accept only the governed Node 24 engine range, pin pnpm 11.15.0 and every direct dependency exactly, and commit one frozen pnpm lockfile.
- **Rationale:** Reproducible installs and supported security patches reduce platform and supply-chain ambiguity.
- **Consequences:** Updates are explicit review events; mixed lockfiles and floating container tags are prohibited.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Dependency Inventory](DEPENDENCY_INVENTORY.md)

## MEM-032: ESM Module Policy

- **Decision:** Repository TypeScript packages use ESM with NodeNext server resolution, bundler resolution at the web boundary, explicit `.js` relative imports, and public package-root exports.
- **Rationale:** A consistent modern module model prevents runtime/compiler divergence and deep-import coupling.
- **Consequences:** CommonJS mixing and package-internal deep imports require explicit review.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Coding Standard](CODING_STANDARD.md)

## MEM-033: Environment Validation Boundary

- **Decision:** Server configuration is parsed once at process startup, fails fast safely, rejects live trading enablement, and exposes only public `VITE_` variables to browsers.
- **Rationale:** Central validation prevents implicit defaults, secret exposure, and unsafe partial startup.
- **Consequences:** Runtime code receives typed configuration rather than reading `process.env` throughout the application.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Environment Configuration](ENVIRONMENT_CONFIGURATION.md)

## MEM-034: Versioned Health and Readiness Contract

- **Decision:** Health contract 1.0.0 defines shared overall/dependency states; liveness excludes remote dependencies and readiness checks PostgreSQL/Redis with redacted bounded failures.
- **Rationale:** Stable probe semantics support operations without leaking configuration or causing restart loops.
- **Consequences:** Contract changes require versioning and synchronized API/web/worker tests.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Health and Readiness](HEALTH_AND_READINESS.md)

## MEM-035: CI Security Baseline

- **Decision:** Pull requests and main are gated by read-only CI; official actions are SHA-pinned; frozen install, quality, integration, E2E, audit, secret, lockfile, and environment checks run without production secrets or deployment.
- **Rationale:** Repository truth needs automated, least-privilege enforcement.
- **Consequences:** `pull_request_target`, unreviewed production deployment, floating actions, and secret-bearing untrusted jobs are prohibited.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [CI Security Baseline](CI_SECURITY_BASELINE.md)

## MEM-036: Workspace Package Boundary

- **Decision:** Applications and the worker consume private shared packages only through declared `workspace:*` root exports; future placeholder service directories are not packages until deliberately bootstrapped.
- **Rationale:** Explicit package boundaries support the modular-monolith architecture and avoid accidental service claims.
- **Consequences:** Workspace validation rejects duplicate names, version/engine drift, and invalid internal dependency ranges.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Development Platform](DEVELOPMENT_PLATFORM.md)

## MEM-037: Dependency Update and Build-Script Policy

- **Decision:** Dependency updates require official version/license/advisory review, frozen lockfile regeneration, full gates, and explicit pnpm lifecycle-script allow/deny entries.
- **Rationale:** Install scripts and unreviewed version drift are high-impact supply-chain risks.
- **Consequences:** Only required build scripts are enabled; deprecated/transitive findings remain visible until upstream resolution.
- **Status:** Accepted
- **Date:** 2026-07-19
- **Related implementation document:** [Dependency Inventory](DEPENDENCY_INVENTORY.md)
