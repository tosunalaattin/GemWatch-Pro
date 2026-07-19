# Technology Evaluation

## 1. Executive Summary

Sprint 0.2 accepts a modular-monolith-first architecture with one deployable backend and independently runnable workers. The initial stack is TypeScript on a currently supported Node.js LTS line, React with Vite, Fastify, pnpm workspaces with Turborepo, PostgreSQL, Drizzle with reviewed SQL migrations, Redis, BullMQ, REST/OpenAPI plus WebSocket, OpenTelemetry with structured JSON logs, Vitest, Testcontainers, and Playwright. Local development uses native Node tooling with Docker Compose infrastructure. GitHub Actions is the CI platform. Isolated Docker Compose on the existing AWS host is acceptable for staging only; production targets ECS Fargate with managed PostgreSQL and Redis after validation. AWS Cognito is the initial managed identity boundary.

The choices optimize safety, traceability, testability, and operational simplicity for one developer. They do not authorize application features, select an initial blockchain, enable paper or live trading, or claim that the production topology is complete.

## 2. Project Constraints

- One primary developer uses Codex on Windows and needs a reproducible, low-friction workflow.
- The system must ingest real-time blockchain and provider data while retaining provenance and deterministic decision records.
- Provider SDKs, frameworks, storage, and transports cannot enter the domain layer.
- Financial values require exact representations; safety decisions cannot depend on binary floating-point comparisons.
- Trade Execution cannot bypass Risk Manager, AI cannot authorize trades, and live trading remains disabled.
- The first backend should deploy as one unit while workers can run separately and bounded contexts can later be extracted.
- AWS is the intended hosting environment, but local portability and an exit path from managed services must remain.
- Sprint 0.2 is documentation-only; dependency and exact major-version pinning belongs to Sprint 0.3.

## 3. Evaluation Method

Candidates were evaluated against the weighted matrix in [Technology Decision Matrix](TECHNOLOGY_DECISION_MATRIX.md), official documentation, project constraints, security boundaries, and operational lifecycle. Scores are directional assessments from 1 to 5, not benchmarks. Weighted totals inform but do not dictate decisions; architecture fit, failure consequences, and migration cost can override a small score difference.

## 4. Weighted Criteria

| Criterion | Weight |
| --- | ---: |
| Security | 15 |
| Maintainability | 13 |
| Ecosystem maturity | 11 |
| Developer productivity | 11 |
| Operational simplicity | 11 |
| Testability | 10 |
| Real-time suitability | 8 |
| Performance | 7 |
| Scalability | 6 |
| Cost efficiency | 5 |
| Vendor independence | 3 |
| **Total** | **100** |

Security leads because the system may eventually influence transactions. Maintainability, ecosystem, productivity, and operations reflect the single-developer starting context. Performance matters, but unmeasured throughput does not justify premature distributed complexity.

## 5. Candidate Technologies

### 5.1 Architecture Style

#### Modular monolith first

- **Strengths:** One deployment and transaction boundary with explicit modules; low initial coordination overhead.
- **Weaknesses:** Module boundaries require architectural tests and discipline rather than network isolation.
- **Security implications:** Central controls are easier to audit, but accidental internal bypasses must be prohibited.
- **Operational implications:** API and worker processes can share an artifact while scaling independently.
- **Developer experience:** Simple navigation, local startup, refactoring, and end-to-end testing.
- **Ecosystem maturity:** Established modular and domain-oriented patterns.
- **Performance characteristics:** In-process calls avoid serialization overhead.
- **Scaling path:** Extract a bounded context only after independent load, ownership, or isolation evidence.
- **Cost implications:** Lowest initial infrastructure and observability cost.
- **Project fit:** Strong fit for one developer and one deployable backend.
- **Rejection or acceptance rationale:** **Accepted**; microservices and an unstructured monolith are rejected initially.

### 5.2 Primary Language and Runtime

#### TypeScript with Node.js LTS

- **Strengths:** Shared types and contracts across web/backend, mature WebSocket/web3 clients, strong async I/O.
- **Weaknesses:** CPU-bound analysis and event-loop blocking require worker isolation; static types do not replace runtime validation.
- **Security implications:** Large package ecosystem expands supply-chain exposure; supported LTS and dependency gates are mandatory.
- **Operational implications:** One runtime for API and workers simplifies builds and containers.
- **Developer experience:** Strong editor and Codex support with one language across most of the repository.
- **Ecosystem maturity:** Mature HTTP, WebSocket, blockchain, database, testing, and telemetry libraries.
- **Performance characteristics:** Strong I/O concurrency; CPU-heavy work must move to worker threads or later services.
- **Scaling path:** Stateless API and dedicated workers can scale separately; Python or Go services may be added behind contracts.
- **Cost implications:** Low tooling overhead and broad hosting support.
- **Project fit:** Best overall fit for shared contracts and real-time orchestration.
- **Rejection or acceptance rationale:** **Accepted** on a currently supported Node.js LTS line; exact version is pinned in Sprint 0.3.

#### Python

- **Strengths:** Excellent analysis, data, and AI ecosystem; concise development.
- **Weaknesses:** A second frontend language, packaging variance, and async/CPU deployment choices add complexity.
- **Security implications:** Mature tooling but dependency and deserialization risks still require controls.
- **Operational implications:** Viable for later analytical workers, not needed as the initial primary runtime.
- **Developer experience:** Strong for data science; weaker shared-contract story with the web client.
- **Ecosystem maturity:** Excellent AI/ML and mature API frameworks.
- **Performance characteristics:** Good I/O with async frameworks; CPU work often needs process scaling or native libraries.
- **Scaling path:** Suitable for a later isolated model or research service.
- **Cost implications:** Similar hosting cost but adds a second toolchain.
- **Project fit:** Strong secondary-language candidate.
- **Rejection or acceptance rationale:** Rejected as the initial primary language; explicitly allowed later behind versioned contracts.

#### Go

- **Strengths:** Strong concurrency, predictable binaries, low memory use, and excellent network performance.
- **Weaknesses:** No shared frontend language and a less direct AI/data-science path.
- **Security implications:** Smaller dependency graphs and static binaries help, but blockchain SDK coverage varies by chain.
- **Operational implications:** Simple artifacts and efficient workers.
- **Developer experience:** Clear tooling but more verbose domain and web contract work.
- **Ecosystem maturity:** Mature server ecosystem; uneven web3 coverage compared with TypeScript.
- **Performance characteristics:** Excellent for CPU/network workers.
- **Scaling path:** Candidate for future high-throughput chain ingestion.
- **Cost implications:** Efficient runtime, offset by multi-language maintenance.
- **Project fit:** Strong future extraction option.
- **Rejection or acceptance rationale:** Rejected as primary because initial integration and shared-contract benefits outweigh its runtime edge.

### 5.3 Web Frontend

#### React with Vite

- **Strengths:** Component ecosystem, fast SPA tooling, static deployment, charts/tables support, and PWA path.
- **Weaknesses:** Routing, data fetching, authentication integration, and conventions must be selected explicitly.
- **Security implications:** Browser remains untrusted; tokens must not be persisted in unsafe storage.
- **Operational implications:** Static assets can be served independently from the API.
- **Developer experience:** Fast feedback and shared TypeScript contracts.
- **Ecosystem maturity:** Broad UI, visualization, accessibility, and testing support.
- **Performance characteristics:** Suitable for a dashboard when bundle budgets and rendering are controlled.
- **Scaling path:** Feature modules and route-level splitting; backend remains separate.
- **Cost implications:** Low hosting and build complexity.
- **Project fit:** Strong for an authenticated, real-time, SEO-light SPA.
- **Rejection or acceptance rationale:** **Accepted**.

#### Next.js

- **Strengths:** Integrated routing, server rendering, server components, and full-stack conventions.
- **Weaknesses:** Adds server/runtime behavior that the SEO-light SPA does not currently need.
- **Security implications:** More server/client boundaries and cache semantics to secure.
- **Operational implications:** Additional deployment and rendering concerns.
- **Developer experience:** Productive when its conventions fit; duplicates a separate Fastify backend boundary here.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Strong rendering options, but not inherently beneficial for the current dashboard profile.
- **Scaling path:** Capable, with greater framework coupling.
- **Cost implications:** More operational surface than static Vite assets.
- **Project fit:** Acceptable if future public SEO/SSR requirements emerge.
- **Rejection or acceptance rationale:** Rejected initially; review if public content or SSR becomes material.

#### Vanilla TypeScript

- **Strengths:** Minimal framework dependency and full platform control.
- **Weaknesses:** Recreates component, state, accessibility, and testing conventions.
- **Security implications:** Smaller framework surface but more custom code to review.
- **Operational implications:** Simple static build.
- **Developer experience:** Poor fit for a complex chart/table dashboard.
- **Ecosystem maturity:** Browser platform is mature; application conventions are project-owned.
- **Performance characteristics:** Potentially lean but easy to optimize prematurely.
- **Scaling path:** Maintainability declines as UI complexity grows.
- **Cost implications:** Low dependency cost, high engineering cost.
- **Project fit:** Weak.
- **Rejection or acceptance rationale:** Rejected.

### 5.4 Backend Framework

#### Fastify

- **Strengths:** Encapsulated plugin model, schema validation/serialization, TypeScript support, injection testing, and Pino integration.
- **Weaknesses:** The project must define its own modular application conventions.
- **Security implications:** Response schemas reduce accidental disclosure; schemas are trusted code and error output requires sanitization.
- **Operational implications:** Small framework surface and structured request logging.
- **Developer experience:** Direct and composable without imposing domain architecture.
- **Ecosystem maturity:** Mature Node framework with documented LTS policy.
- **Performance characteristics:** Efficient HTTP path; performance is secondary to schema and boundary benefits.
- **Scaling path:** Stateless instances and separately started workers.
- **Cost implications:** Low resource and framework overhead.
- **Project fit:** Strongest fit for a framework-independent domain.
- **Rejection or acceptance rationale:** **Accepted**.

#### NestJS

- **Strengths:** Strong module, dependency injection, validation, and team conventions.
- **Weaknesses:** More abstraction, decorators, and framework coupling than the initial team needs.
- **Security implications:** Consistency helps, but hidden provider coupling can form through framework modules.
- **Operational implications:** Larger framework and upgrade surface.
- **Developer experience:** Excellent for convention-oriented teams; heavier for one developer.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Adequate, with adapter overhead depending on platform.
- **Scaling path:** Supports modules and microservices.
- **Cost implications:** Higher cognitive and dependency cost.
- **Project fit:** Viable but not preferred.
- **Rejection or acceptance rationale:** Rejected initially.

#### Express

- **Strengths:** Minimal, familiar, and exceptionally broad middleware ecosystem.
- **Weaknesses:** Validation, serialization, typing, and project structure require assembly.
- **Security implications:** Middleware selection and ordering create more room for inconsistent boundaries.
- **Operational implications:** Simple runtime but more project-owned conventions.
- **Developer experience:** Easy start, higher long-term governance cost.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Adequate but not a deciding advantage.
- **Scaling path:** Stateless scaling is straightforward.
- **Cost implications:** Low runtime cost, higher maintenance cost.
- **Project fit:** Acceptable, less aligned with contract-first APIs.
- **Rejection or acceptance rationale:** Rejected.

### 5.5 Monorepo and Package Management

#### pnpm workspaces plus Turborepo

- **Strengths:** Strict dependency boundaries, efficient store, workspace protocol, task graph, caching, and simple configuration.
- **Weaknesses:** Two tools and cache correctness require documented inputs/outputs.
- **Security implications:** Frozen lockfile, script controls, and dependency review remain mandatory.
- **Operational implications:** Reproducible workspace tasks without running an application platform.
- **Developer experience:** Fast installs and consistent root commands.
- **Ecosystem maturity:** Mature and widely adopted in TypeScript monorepos.
- **Performance characteristics:** Efficient installs and parallel cached tasks.
- **Scaling path:** Handles added packages/apps; reassess only if governance needs outgrow it.
- **Cost implications:** Open-source tooling and reduced CI work.
- **Project fit:** Strong balance for a small team.
- **Rejection or acceptance rationale:** **Accepted**; pnpm is package manager, Turborepo is task orchestrator.

#### npm workspaces

- **Strengths:** Bundled with Node and lowest tool count.
- **Weaknesses:** Less strict/efficient workspace behavior and no equivalent task graph by itself.
- **Security implications:** Standard lockfile and audit support.
- **Operational implications:** Simple, but task orchestration needs scripts or another tool.
- **Developer experience:** Familiar.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Adequate.
- **Scaling path:** Works for moderate workspaces.
- **Cost implications:** Minimal.
- **Project fit:** Safe fallback.
- **Rejection or acceptance rationale:** Rejected because pnpm strictness and efficiency are valuable.

#### Yarn and Nx

- **Strengths:** Yarn offers mature workspace features; Nx offers rich dependency graphs, generators, and policy.
- **Weaknesses:** Yarn adds no decisive fit advantage; Nx adds configuration and concepts beyond current needs.
- **Security implications:** Both require lockfile and plugin supply-chain controls.
- **Operational implications:** Nx can become a platform of its own.
- **Developer experience:** Strong for larger teams, heavier for this start.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Strong caching and parallelization.
- **Scaling path:** Nx is a future option if the workspace becomes large.
- **Cost implications:** More learning and maintenance time.
- **Project fit:** Capable but excessive initially.
- **Rejection or acceptance rationale:** Rejected initially.

### 5.6 Primary Database

#### PostgreSQL

- **Strengths:** ACID transactions, exact numeric, JSONB, indexing, constraints, partitioning, mature tooling, and AWS RDS support.
- **Weaknesses:** Time-series growth and partition operations require deliberate design.
- **Security implications:** Strong roles, TLS, encryption through hosting, and auditable access; configuration is still critical.
- **Operational implications:** One relational source for transactional state, idempotency, configuration, and audit metadata.
- **Developer experience:** Strong SQL ecosystem and local containers.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Strong mixed transactional/query workload with correct indexing and partitions.
- **Scaling path:** Read replicas, partitioning, vertical growth, managed services, and later specialized stores.
- **Cost implications:** One primary engine reduces initial cost.
- **Project fit:** Best fit for relational consistency plus controlled JSON.
- **Rejection or acceptance rationale:** **Accepted** for data requirements, not popularity.

#### MySQL

- **Strengths:** Mature ACID relational engine, broad tooling, and managed AWS support.
- **Weaknesses:** PostgreSQL offers a better combined fit for rich JSON, exact analytics, constraints, and extension/partition direction.
- **Security implications:** Mature access and encryption capabilities.
- **Operational implications:** Comparable operations.
- **Developer experience:** Strong.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Strong transactional performance.
- **Scaling path:** Mature replication and managed options.
- **Cost implications:** Comparable.
- **Project fit:** Viable alternative.
- **Rejection or acceptance rationale:** Rejected because PostgreSQL better unifies the planned data shapes.

#### MongoDB

- **Strengths:** Flexible document ingestion and convenient raw/provider shapes.
- **Weaknesses:** Primary relationships, financial state, configuration, audit, and cross-entity constraints are predominantly transactional.
- **Security implications:** Mature controls, but schema flexibility can hide invalid state without strict application validation.
- **Operational implications:** Would not eliminate the likely need for relational storage.
- **Developer experience:** Productive for documents.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Strong document workloads.
- **Scaling path:** Mature horizontal scaling.
- **Cost implications:** A second future store may be justified, but not initially.
- **Project fit:** Weak as the primary source; possible later specialized store.
- **Rejection or acceptance rationale:** Rejected as primary.

### 5.7 Data Access and Migrations

#### Drizzle plus reviewed SQL migrations

- **Strengths:** Type-safe SQL-like access, explicit SQL output, raw SQL escape path, and small abstraction surface.
- **Weaknesses:** Less protective abstraction than a full ORM; complex mappings remain project-owned.
- **Security implications:** Parameterized access and reviewable migrations help; unsafe raw SQL is restricted.
- **Operational implications:** Generated SQL is reviewed, tested against clean and upgraded databases, then applied by a controlled migration job.
- **Developer experience:** Shared TypeScript schema and direct database semantics.
- **Ecosystem maturity:** Younger than Prisma/TypeORM but established and actively documented.
- **Performance characteristics:** Thin query layer with direct SQL control.
- **Scaling path:** Supports partitions, indexes, transactions, and targeted raw SQL.
- **Cost implications:** Low runtime overhead.
- **Project fit:** Strong for data-intensive, SQL-aware work.
- **Rejection or acceptance rationale:** **Accepted**; direct schema push is forbidden outside disposable local environments.

#### Prisma

- **Strengths:** Excellent schema tooling, type generation, migrations, and onboarding.
- **Weaknesses:** Abstraction and generated client can constrain advanced SQL and large/time-series patterns.
- **Security implications:** Parameterized client; migration review still required.
- **Operational implications:** Mature workflow with a separate schema language.
- **Developer experience:** Excellent.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Adequate, with abstraction costs and query-shape considerations.
- **Scaling path:** Raw SQL remains possible but is less central.
- **Cost implications:** Low direct cost.
- **Project fit:** Strong runner-up.
- **Rejection or acceptance rationale:** Rejected because SQL control is a stronger project driver.

#### TypeORM

- **Strengths:** Mature patterns, decorators, transactions, and multiple database support.
- **Weaknesses:** Heavier entity abstraction and historically complex migration/schema synchronization behavior.
- **Security implications:** Safe query APIs exist; automatic synchronization is unacceptable.
- **Operational implications:** More framework conventions and runtime metadata.
- **Developer experience:** Familiar to many Node teams.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Adequate but easier to produce hidden query behavior.
- **Scaling path:** Supports raw queries and transactions.
- **Cost implications:** Low direct cost, higher maintenance uncertainty.
- **Project fit:** Lower.
- **Rejection or acceptance rationale:** Rejected.

### 5.8 Cache, Locks, and Ephemeral State

#### Redis

- **Strengths:** TTL cache, rate limiting, ephemeral provider state, job coordination, sessions, and WebSocket fan-out.
- **Weaknesses:** A separate operational dependency with explicit persistence and eviction semantics.
- **Security implications:** Private networking, authentication/TLS, key namespaces, least privilege, and no secret storage are required.
- **Operational implications:** Data is disposable or reconstructable by default; BullMQ durability settings are separately defined.
- **Developer experience:** Mature clients and local container.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Low-latency in-memory operations.
- **Scaling path:** Managed Redis, replicas, and cluster only when measured.
- **Cost implications:** Additional service, justified by multiple ephemeral use cases.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**. PostgreSQL remains authoritative for idempotency and financial state; Redis locks never solely protect irreversible actions.

#### PostgreSQL-only

- **Strengths:** One durable system and transactional advisory/row locking.
- **Weaknesses:** Cache churn, fan-out, rate counters, and job traffic can contend with primary data.
- **Security implications:** Centralized authorization and backup.
- **Operational implications:** Simplest topology.
- **Developer experience:** Familiar SQL.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Good for durable coordination, less suitable for high-churn ephemeral workloads.
- **Scaling path:** Queue/cache load can force premature primary scaling.
- **Cost implications:** Lowest initial service cost.
- **Project fit:** Used selectively for authoritative locks/idempotency, not as the only cache.
- **Rejection or acceptance rationale:** Rejected as the sole ephemeral store.

#### Process-local memory

- **Strengths:** No network or infrastructure.
- **Weaknesses:** Not shared, lost on restart, inconsistent across replicas, and difficult to bound.
- **Security implications:** Sensitive values can linger in process memory.
- **Operational implications:** Acceptable only for small read-through caches with correctness-independent eviction.
- **Developer experience:** Simple.
- **Ecosystem maturity:** Native.
- **Performance characteristics:** Fastest access.
- **Scaling path:** None across processes.
- **Cost implications:** Minimal.
- **Project fit:** Restricted optimization only.
- **Rejection or acceptance rationale:** Rejected for coordination, sessions, rate limits, and shared state.

### 5.9 Asynchronous Jobs and Messaging

#### BullMQ on Redis

- **Strengths:** TypeScript-native workers, retries, delayed jobs, concurrency, repeatable jobs, progress, and failure handling.
- **Weaknesses:** Queue durability depends on Redis configuration and is not atomically coupled to PostgreSQL writes.
- **Security implications:** Workers need scoped queue access; job payloads must be validated and redacted.
- **Operational implications:** Reuses Redis and allows worker processes to scale separately.
- **Developer experience:** Strong Node fit.
- **Ecosystem maturity:** Established.
- **Performance characteristics:** Suitable for discovery enrichment, analysis, notification, backfill, and paper simulation.
- **Scaling path:** More workers and queue separation; broker migration remains behind an internal job port.
- **Cost implications:** Avoids a third stateful service initially.
- **Project fit:** Best initial operational balance.
- **Rejection or acceptance rationale:** **Accepted**, combined with a PostgreSQL transactional outbox, at-least-once consumers, idempotency, bounded retries, and dead-letter/quarantine handling.

#### PostgreSQL-backed queue

- **Strengths:** Atomic enqueue with domain state and one operational store.
- **Weaknesses:** High queue churn and long jobs compete with primary database workloads.
- **Security implications:** Uses database roles and transactions.
- **Operational implications:** Simple start and strong durability.
- **Developer experience:** Good, library choice remains.
- **Ecosystem maturity:** Mature patterns but fragmented Node libraries.
- **Performance characteristics:** Adequate at modest scale.
- **Scaling path:** Requires careful polling, locking, vacuum, and partition management.
- **Cost implications:** Lowest topology cost.
- **Project fit:** Strong alternative and source of the outbox pattern.
- **Rejection or acceptance rationale:** Rejected as primary worker queue because Redis is already justified.

#### RabbitMQ

- **Strengths:** Mature routing, acknowledgements, dead lettering, backpressure, and durable quorum queues.
- **Weaknesses:** Adds another broker and operational model.
- **Security implications:** Strong virtual-host and permission model when configured.
- **Operational implications:** More backups, upgrades, monitoring, and incident paths.
- **Developer experience:** Mature clients but more concepts.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Strong general messaging.
- **Scaling path:** Excellent.
- **Cost implications:** Unjustified initial service cost.
- **Project fit:** Future option if routing/delivery needs exceed BullMQ.
- **Rejection or acceptance rationale:** Rejected initially.

#### Kafka and AWS SQS

- **Strengths:** Kafka excels at durable replayable streams; SQS provides managed queues, visibility timeouts, and DLQs.
- **Weaknesses:** Kafka is operationally excessive; SQS creates AWS/local semantic differences and vendor coupling.
- **Security implications:** Both support strong controls but require careful permissions and idempotent consumers.
- **Operational implications:** Kafka needs specialist operations; SQS removes broker operations.
- **Developer experience:** Kafka is concept-heavy; SQS is simple in AWS but needs local substitutes.
- **Ecosystem maturity:** Both mature.
- **Performance characteristics:** Kafka excels at high-throughput logs; SQS scales managed queues.
- **Scaling path:** Excellent.
- **Cost implications:** Kafka is high; SQS is usage-based.
- **Project fit:** SQS scored well but portability and staging parity win initially.
- **Rejection or acceptance rationale:** Rejected initially; review SQS for production workers and Kafka only for proven replay/throughput needs.

### 5.10 API and Real-Time Communication

#### REST/OpenAPI plus WebSocket

- **Strengths:** Explicit resource APIs, broad tooling, cacheable reads, generated documentation, and bidirectional real-time updates.
- **Weaknesses:** Two transport lifecycles and connection state must be governed.
- **Security implications:** Authorization applies per REST operation and per WebSocket connection/subscription/message.
- **Operational implications:** Standard ingress with sticky-state avoidance via Redis fan-out when multiple instances exist.
- **Developer experience:** Familiar and testable.
- **Ecosystem maturity:** Very mature.
- **Performance characteristics:** Appropriate for CRUD/search and real-time dashboards.
- **Scaling path:** Stateless REST; WebSocket gateways scale with shared fan-out.
- **Cost implications:** Low and portable.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**. SSE remains a one-way fallback; GraphQL is deferred.

#### GraphQL with subscriptions

- **Strengths:** Flexible dashboard queries and typed schema.
- **Weaknesses:** Query cost, authorization, caching, N+1 behavior, and subscription operations add complexity.
- **Security implications:** Requires depth/complexity limits and field-level policy.
- **Operational implications:** More specialized monitoring and caching.
- **Developer experience:** Strong clients but additional schema/runtime.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Efficient client selection when resolvers are controlled.
- **Scaling path:** Capable with governance.
- **Cost implications:** Higher engineering cost.
- **Project fit:** No proven need yet.
- **Rejection or acceptance rationale:** Rejected initially.

#### REST plus Server-Sent Events

- **Strengths:** Simple one-way streaming, browser reconnection, and HTTP-compatible ingress.
- **Weaknesses:** Does not support bidirectional control and has browser connection considerations.
- **Security implications:** Standard HTTP auth with long-lived stream controls.
- **Operational implications:** Simpler than WebSocket for alerts.
- **Developer experience:** Straightforward.
- **Ecosystem maturity:** Mature web standard.
- **Performance characteristics:** Strong for one-way feeds.
- **Scaling path:** Shared fan-out still required.
- **Cost implications:** Low.
- **Project fit:** Useful fallback or notification feed.
- **Rejection or acceptance rationale:** Not the primary real-time transport because interactive operations are expected.

### 5.11 Blockchain Integration

#### Internal chain adapters over RPC and WebSocket ports

- **Strengths:** Normalizes chain semantics while retaining raw evidence and provider fallback.
- **Weaknesses:** Requires explicit finality, reorg, confirmation, and identity policy per chain.
- **Security implications:** All chain input is untrusted; mainnet endpoints are read-only until later gated phases.
- **Operational implications:** Health, lag, rate-limit, fallback, and reconciliation metrics are required.
- **Developer experience:** Fixtures and fake ports permit deterministic testing without networks.
- **Ecosystem maturity:** Depends on the selected future chain; interface remains internal.
- **Performance characteristics:** Listener and backfill workers can scale independently.
- **Scaling path:** Add provider and chain adapters without changing domain contracts.
- **Cost implications:** Multiple providers may be needed for resilience.
- **Project fit:** Required by locked provider-independence decisions.
- **Rejection or acceptance rationale:** **Accepted**; no blockchain is selected in Sprint 0.2.

#### Direct SDK use in domain modules

- **Strengths:** Fastest prototype path.
- **Weaknesses:** Leaks provider types, retry behavior, and chain assumptions.
- **Security implications:** Makes corroboration and trusted-boundary review harder.
- **Operational implications:** Provider changes propagate through business logic.
- **Developer experience:** Initially easy, later expensive.
- **Ecosystem maturity:** Varies.
- **Performance characteristics:** Direct.
- **Scaling path:** Poor.
- **Cost implications:** Hidden migration cost.
- **Project fit:** Conflicts with MEM-003.
- **Rejection or acceptance rationale:** Prohibited.

#### Third-party-provider-only ingestion

- **Strengths:** Low initial RPC complexity.
- **Weaknesses:** Availability, freshness, coverage, and trust depend on one source.
- **Security implications:** Cannot independently corroborate critical conclusions.
- **Operational implications:** Vendor outage becomes platform outage.
- **Developer experience:** Simple.
- **Ecosystem maturity:** Provider-specific.
- **Performance characteristics:** Limited by provider quotas.
- **Scaling path:** Vendor-controlled.
- **Cost implications:** Potentially escalating.
- **Project fit:** Insufficient as a sole strategy.
- **Rejection or acceptance rationale:** Rejected.

Chain selection criteria are user demand, DEX activity, accessible historical and real-time data, RPC cost and limits, reorg/finality characteristics, SDK maturity, token/pool standards, explorer support, provider diversity, testability, and incident risk.

### 5.12 External Provider Integration

#### Internal provider adapter standard

- **Strengths:** Stable normalized contracts, provenance, health, error classification, and replaceability.
- **Weaknesses:** Additional mapping and fixtures per provider.
- **Security implications:** Central validation, timeout, redaction, and circuit-breaker policy.
- **Operational implications:** Per-provider latency, quota, freshness, error, and cost signals.
- **Developer experience:** Domain tests do not require vendor SDKs.
- **Ecosystem maturity:** Ports-and-adapters pattern is established.
- **Performance characteristics:** Small translation overhead.
- **Scaling path:** Providers and categories scale independently.
- **Cost implications:** Enables cost-aware routing and exit.
- **Project fit:** Mandatory.
- **Rejection or acceptance rationale:** **Accepted** for market, DEX, security, social, wallet, price-history, and RPC categories.

#### Direct SDK clients or one aggregation gateway

- **Strengths:** Less initial mapping.
- **Weaknesses:** Vendor types and availability become domain assumptions.
- **Security implications:** Weakens validation and corroboration.
- **Operational implications:** Poor per-capability failover.
- **Developer experience:** Quick start, costly replacement.
- **Ecosystem maturity:** Provider-specific.
- **Performance characteristics:** Potentially direct.
- **Scaling path:** Constrained by vendor.
- **Cost implications:** Lock-in and pricing exposure.
- **Project fit:** Conflicts with locked decisions.
- **Rejection or acceptance rationale:** Rejected.

### 5.13 Observability

#### OpenTelemetry plus structured JSON logs

- **Strengths:** Vendor-neutral traces/metrics, context propagation, collector/exporter flexibility, and correlated JSON logs.
- **Weaknesses:** JavaScript OTel logs are not yet stable; semantic conventions and cardinality need governance.
- **Security implications:** Central redaction, allowlisted attributes, and no payload/secret capture.
- **Operational implications:** Start with stdout JSON and OTel traces/metrics; collector/backend can evolve.
- **Developer experience:** Auto-instrumentation plus explicit domain spans and metrics.
- **Ecosystem maturity:** CNCF standard; JS traces/metrics stable according to official status.
- **Performance characteristics:** Sampling and aggregation control overhead.
- **Scaling path:** Collector tiers and backend replacement without domain changes.
- **Cost implications:** Telemetry volume budgets are required.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**.

#### Vendor-specific SDK

- **Strengths:** Fast onboarding and polished backend features.
- **Weaknesses:** Instrumentation and data model lock-in.
- **Security implications:** Direct third-party export and data residency need review.
- **Operational implications:** Lower setup, higher exit cost.
- **Developer experience:** Often excellent.
- **Ecosystem maturity:** Vendor-dependent.
- **Performance characteristics:** Usually optimized.
- **Scaling path:** Vendor plans and limits.
- **Cost implications:** Usage cost can grow unexpectedly.
- **Project fit:** May be an exporter/backend, not the application contract.
- **Rejection or acceptance rationale:** Rejected as the instrumentation boundary.

#### Structured logs only

- **Strengths:** Simplest start and easy stdout collection.
- **Weaknesses:** Weak latency breakdown, cross-worker causality, metrics, and proactive health.
- **Security implications:** Smaller telemetry surface but logs can still leak data.
- **Operational implications:** Insufficient for provider lag and decision pipelines.
- **Developer experience:** Easy.
- **Ecosystem maturity:** Universal.
- **Performance characteristics:** Low initial overhead.
- **Scaling path:** Becomes hard to retrofit consistent traces.
- **Cost implications:** Low start, high diagnostic cost.
- **Project fit:** Necessary but not sufficient.
- **Rejection or acceptance rationale:** Rejected as the sole approach.

### 5.14 Testing

#### Vitest, Testcontainers, and Playwright suite

- **Strengths:** Fast TypeScript unit tests, real PostgreSQL/Redis integration tests, and cross-browser end-to-end coverage.
- **Weaknesses:** Container and browser setup increases CI time.
- **Security implications:** Isolated test credentials and no mainnet/live execution paths.
- **Operational implications:** Container runtime required for integration tests.
- **Developer experience:** Consistent TypeScript tooling and watch mode.
- **Ecosystem maturity:** Mature active projects.
- **Performance characteristics:** Parallel execution with explicit resource limits.
- **Scaling path:** Split unit, integration, contract, browser, security, and performance jobs.
- **Cost implications:** Moderate CI time, high defect-prevention value.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**, with Fastify injection, OpenAPI/event schema contracts, fake clock, fixtures, optional fast-check, k6, and security scanners.

#### Jest-centered suite

- **Strengths:** Extremely mature ecosystem and broad familiarity.
- **Weaknesses:** More configuration friction in modern ESM/Vite workspaces.
- **Security implications:** Comparable.
- **Operational implications:** Mature CI behavior.
- **Developer experience:** Strong but less aligned with Vite.
- **Ecosystem maturity:** Excellent.
- **Performance characteristics:** Adequate.
- **Scaling path:** Strong.
- **Cost implications:** Low.
- **Project fit:** Viable fallback.
- **Rejection or acceptance rationale:** Rejected in favor of Vitest alignment.

#### Node test runner and scripts only

- **Strengths:** Minimal dependencies and native runtime.
- **Weaknesses:** More project-owned mocking, coverage, browser, and workspace conventions.
- **Security implications:** Smaller dependency surface.
- **Operational implications:** Simple.
- **Developer experience:** Adequate for libraries, less cohesive for the whole platform.
- **Ecosystem maturity:** Core-supported.
- **Performance characteristics:** Strong.
- **Scaling path:** Additional tools still required.
- **Cost implications:** Low direct cost.
- **Project fit:** Insufficient as the full strategy.
- **Rejection or acceptance rationale:** Rejected as sole framework.

### 5.15 Local Development

#### Native Node tools plus Docker Compose infrastructure

- **Strengths:** Fast editor/debug loop with reproducible PostgreSQL and Redis.
- **Weaknesses:** Requires supported Node/pnpm plus Docker Desktop.
- **Security implications:** Local-only ports, non-production credentials, and isolated volumes/networks.
- **Operational implications:** One command target starts infrastructure and health checks; application processes may run natively.
- **Developer experience:** Best Windows balance.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Avoids source bind-mount overhead for Node processes.
- **Scaling path:** Compose adds optional telemetry/test services.
- **Cost implications:** Local resources only.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**; WSL2 is supported but not mandatory.

#### All-native services

- **Strengths:** No container runtime.
- **Weaknesses:** Windows service versions, cleanup, ports, and parity become manual.
- **Security implications:** More host-level persistence and configuration.
- **Operational implications:** Poor reproducibility.
- **Developer experience:** Simple only after careful installation.
- **Ecosystem maturity:** Mature tools.
- **Performance characteristics:** Native.
- **Scaling path:** Weak team parity.
- **Cost implications:** Low direct, higher support time.
- **Project fit:** Rejected.
- **Rejection or acceptance rationale:** Rejected.

#### Dev containers

- **Strengths:** Strong environment parity and onboarding.
- **Weaknesses:** Editor/container coupling and Windows filesystem/resource complexity.
- **Security implications:** Container isolation is not a substitute for secret controls.
- **Operational implications:** Additional image lifecycle.
- **Developer experience:** Good when standardized, heavier initially.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Depends on filesystem placement.
- **Scaling path:** Useful for team onboarding.
- **Cost implications:** Maintenance overhead.
- **Project fit:** Deferred optional path.
- **Rejection or acceptance rationale:** Not required initially.

### 5.16 Continuous Integration

#### GitHub Actions

- **Strengths:** Repository-native checks, matrices, caching, environments, permissions, dependency review, and branch protection integration.
- **Weaknesses:** Hosted-runner limits and third-party action supply-chain risk.
- **Security implications:** Default read-only permissions, pinned action commits, OIDC for AWS, protected environments, and no long-lived cloud keys.
- **Operational implications:** Managed runners and visible PR checks.
- **Developer experience:** Direct GitHub feedback.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Adequate with cached pnpm/Turbo tasks.
- **Scaling path:** Job matrices and approved self-hosted runners only if justified.
- **Cost implications:** Controlled by concurrency and cache policy.
- **Project fit:** Strong.
- **Rejection or acceptance rationale:** **Accepted**.

#### Self-hosted CI or another SaaS

- **Strengths:** Self-hosted runners offer control; other SaaS products may offer specialized performance.
- **Weaknesses:** Runner patching/security or another vendor/control plane.
- **Security implications:** Self-hosted runners increase persistence and lateral-movement risk.
- **Operational implications:** More administration.
- **Developer experience:** Additional configuration.
- **Ecosystem maturity:** Mature options exist.
- **Performance characteristics:** Potentially strong.
- **Scaling path:** Capable.
- **Cost implications:** Infrastructure or subscription cost.
- **Project fit:** No current need.
- **Rejection or acceptance rationale:** Rejected initially.

Required gates are formatting, lint, type check, unit and integration tests, build, dependency audit/review, secret scanning, license checks, migration validation, documentation validation, container scanning when images exist, and protected-main requirements. Sprint 0.2 creates no workflow.

### 5.17 AWS Deployment

#### Isolated EC2 Docker Compose for staging

- **Strengths:** Uses the existing host and closely matches local containers.
- **Weaknesses:** Shared-host blast radius, manual patching, single-host availability, and resource contention.
- **Security implications:** Separate Unix user, directory, network, volumes, ports, secrets, firewall, TLS, and non-root containers are mandatory.
- **Operational implications:** Explicit backups, monitoring, resource limits, SSH hardening, reverse proxy, and rollback are required.
- **Developer experience:** Simple initial deployment.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Limited by one host.
- **Scaling path:** Migration to ECS images and managed data stores.
- **Cost implications:** Uses existing capacity.
- **Project fit:** **Accepted for staging only**, isolated from Astro Sling.
- **Rejection or acceptance rationale:** Not accepted as an assumed production target.

#### ECS Fargate for production

- **Strengths:** Managed task runtime, per-task isolation/networking, independent API/worker scaling, IAM roles, and deployment controls.
- **Weaknesses:** AWS-specific infrastructure and higher cost than an already-owned host.
- **Security implications:** Private subnets, task security groups, least-privilege roles, immutable images, and Secrets Manager integration.
- **Operational implications:** Removes host patching while retaining container operations.
- **Developer experience:** More infrastructure work than Compose.
- **Ecosystem maturity:** Mature AWS service.
- **Performance characteristics:** Suitable for long-running API/WebSocket and worker containers.
- **Scaling path:** Service autoscaling and separated task definitions.
- **Cost implications:** Managed-compute premium; budgets and alarms required.
- **Project fit:** **Accepted production direction**, subject to Phase 14 validation.
- **Rejection or acceptance rationale:** Best balance versus EKS or Lambda.

#### EKS, Lambda, and hybrid

- **Strengths:** EKS offers maximum orchestration flexibility; Lambda offers managed event scaling; hybrid can optimize workloads.
- **Weaknesses:** EKS is operationally excessive; Lambda has connection/duration/state constraints for long-lived listeners and WebSockets; hybrid multiplies models.
- **Security implications:** More IAM and network boundaries.
- **Operational implications:** Higher complexity.
- **Developer experience:** More deployment-specific code and testing.
- **Ecosystem maturity:** Mature.
- **Performance characteristics:** Workload-dependent.
- **Scaling path:** Excellent when justified.
- **Cost implications:** EKS/hybrid operations or Lambda request/duration costs.
- **Project fit:** Not needed initially.
- **Rejection or acceptance rationale:** Rejected as the baseline; Lambda may later handle isolated scheduled/event tasks.

Data services: local/staging may use isolated containers only with tested backups; production uses RDS PostgreSQL, managed Redis compatible with the selected client/queue, S3-compatible object storage (AWS S3 initially), Secrets Manager, CloudWatch-compatible storage/export via OTel, an application load balancer or approved ingress, managed TLS certificates, private data subnets, and encrypted backups. Exact regions, instance sizes, RTO/RPO, domains, and prices are deferred.

### 5.18 Authentication and Authorization

#### AWS Cognito user pools

- **Strengths:** Managed credentials, OIDC/OAuth, MFA readiness, hosted login, scopes, and AWS integration.
- **Weaknesses:** AWS coupling, configuration complexity, and recovery/exports require planning.
- **Security implications:** Authorization-code with PKCE, no implicit flow, short-lived tokens, backend validation, secure cookie/session design, and MFA-ready owner role.
- **Operational implications:** Removes password storage from the application.
- **Developer experience:** Local/dev integration requires dedicated non-production configuration.
- **Ecosystem maturity:** Mature managed AWS identity service.
- **Performance characteristics:** External authentication redirects and token validation.
- **Scaling path:** Users, groups, scopes, and federation.
- **Cost implications:** Usage-based; budgets and current pricing require verification before production.
- **Project fit:** Strong within the selected AWS direction.
- **Rejection or acceptance rationale:** **Accepted** as identity provider; domain authorization remains application-owned.

#### Application-managed authentication

- **Strengths:** Full control and vendor independence.
- **Weaknesses:** Password hashing, recovery, MFA, abuse protection, session security, and incident response become project responsibilities.
- **Security implications:** Highest avoidable credential risk.
- **Operational implications:** Large ongoing burden.
- **Developer experience:** More code unrelated to product differentiation.
- **Ecosystem maturity:** Mature libraries, but secure composition remains difficult.
- **Performance characteristics:** Local.
- **Scaling path:** Project-owned.
- **Cost implications:** Hidden engineering and incident cost.
- **Project fit:** Poor.
- **Rejection or acceptance rationale:** Rejected.

#### Third-party managed identity

- **Strengths:** Often excellent developer experience, MFA, and mature hosted flows.
- **Weaknesses:** Another vendor, pricing, data location, and integration boundary.
- **Security implications:** Strong when correctly configured.
- **Operational implications:** Low.
- **Developer experience:** Often best.
- **Ecosystem maturity:** Mature providers exist.
- **Performance characteristics:** Comparable managed flow.
- **Scaling path:** Provider plans.
- **Cost implications:** Must be evaluated against actual usage.
- **Project fit:** Strong fallback and scored highest, but AWS consolidation and fewer vendors decide the initial choice.
- **Rejection or acceptance rationale:** Deferred alternative; Cognito must be reviewed if UX, portability, or cost is inadequate.

Authorization uses owner/operator/read-only roles initially, capability checks at the API, a separate admin boundary, step-up/re-authentication for any future wallet/live operation, complete audit, session revocation, and emergency lockout. Identity claims never directly grant Trade Execution.

### 5.19 Numeric Precision and Time

#### Integer raw amounts plus exact decimal values

- **Strengths:** Preserves token units and exact prices/fiat with explicit scale and rounding.
- **Weaknesses:** Conversion, serialization, database mapping, and UI formatting require discipline.
- **Security implications:** Prevents silent rounding from influencing safety limits.
- **Operational implications:** Schema and contract metadata carry units, decimals, and policy versions.
- **Developer experience:** More explicit than JavaScript number.
- **Ecosystem maturity:** BigInt, PostgreSQL numeric, and decimal libraries are established.
- **Performance characteristics:** Slower than binary float but appropriate for correctness-critical values.
- **Scaling path:** Consistent across workers and future languages.
- **Cost implications:** Negligible versus correctness risk.
- **Project fit:** Mandatory.
- **Rejection or acceptance rationale:** **Accepted** with UTC timestamps and separate chain-event and ingestion times.

#### JavaScript number or untyped decimal strings

- **Strengths:** Convenient or transport-friendly.
- **Weaknesses:** Binary floating-point cannot exactly represent many financial values; bare strings lack scale and invariants.
- **Security implications:** Rounding/comparison errors can break limits.
- **Operational implications:** Inconsistent calculations and reconciliation.
- **Developer experience:** Initially easy, later dangerous.
- **Ecosystem maturity:** Native representations.
- **Performance characteristics:** Fast.
- **Scaling path:** Poor cross-service consistency.
- **Cost implications:** High defect risk.
- **Project fit:** Unacceptable for financial or token amounts.
- **Rejection or acceptance rationale:** Prohibited for correctness decisions.

## 6. Comparative Analysis

The weighted matrix confirms that the proposed TypeScript stack is a strong system-level fit, but several close alternatives remain credible. Go nearly matches TypeScript and is retained for future CPU/network-intensive extraction. SQS outscored BullMQ, but BullMQ is selected initially because Redis is already required and local/staging semantics remain portable; the internal job port and transactional outbox preserve an SQS exit. Third-party managed identity outscored Cognito, but Cognito reduces the number of operational vendors in the accepted AWS direction. REST with SSE slightly outscored WebSocket, yet expected bidirectional real-time operations justify WebSocket while SSE stays available for one-way streams.

The modular monolith is a deployment strategy, not permission for cross-module access. PostgreSQL transactions establish authoritative state; Redis never becomes a financial source of truth. Durable events originate through an outbox, and all consumers assume at-least-once delivery.

## 7. Recommended Initial Stack

| Area | Accepted direction |
| --- | --- |
| Architecture | Modular monolith, one backend artifact, separate API/worker processes |
| Language/runtime | TypeScript on current supported Node.js LTS |
| Web | React SPA with Vite |
| Backend | Fastify with schema-first REST/OpenAPI |
| Workspace | pnpm workspaces and Turborepo |
| Database | PostgreSQL |
| Data access | Drizzle; reviewed, forward-only SQL migrations with rollback plans |
| Cache/ephemeral | Redis, never authoritative for financial state |
| Async jobs | BullMQ plus transactional outbox, idempotent consumers, retries and quarantine |
| Realtime | WebSocket; SSE permitted for one-way feeds |
| Providers/chains | Internal ports and adapters with normalized contracts and raw references |
| Observability | OpenTelemetry traces/metrics and structured JSON logs |
| Testing | Vitest, Fastify injection, Testcontainers, Playwright, contract and security gates |
| Local | Native Node/pnpm with Docker Compose PostgreSQL/Redis/test infrastructure |
| CI | GitHub Actions with least privilege and protected-main gates |
| Staging | Isolated Docker Compose on existing AWS host |
| Production direction | ECS Fargate, RDS PostgreSQL, managed Redis, S3, Secrets Manager |
| Identity | AWS Cognito OIDC authorization-code + PKCE; application capability authorization |
| Numeric/time | raw integer amounts, exact decimal types, UTC, separate observed/ingested times |

## 8. Deferred Decisions

- Initial blockchain and provider selection.
- Exact supported Node major and every dependency/container version, to be locked in Sprint 0.3.
- UI component, chart, state-management, router, and query libraries.
- PostgreSQL extension use, full schema, partition keys, retention durations, and RTO/RPO.
- Redis engine/provider compatibility and persistence configuration for each environment.
- Whether production queues remain BullMQ or move behind the job port to SQS.
- Telemetry backend, sampling rates, retention, alert thresholds, and numeric SLOs.
- AWS region, domain, certificate, network CIDRs, instance/task sizes, and production readiness.
- Cognito tenant, recovery, MFA enforcement timing, and detailed role matrix.
- Decimal library and canonical serialized decimal envelope.
- Wallet custody/signing architecture and any live-trading authorization.

## 9. Explicitly Rejected Approaches

- Microservices from day one, Kubernetes/EKS as the initial platform, and Kafka without measured replay/throughput need.
- Provider SDKs in domain modules or one provider as the sole security authority.
- Web-to-database access, AI-to-Trade Execution calls, and notifications that decide trades.
- MongoDB as the primary transactional store and Redis as the source of financial truth.
- Direct schema synchronization in shared environments or unreviewed production migrations.
- GraphQL as the initial API, Next.js solely for fashion, or server rendering without a product need.
- JavaScript number for token/financial values and local-time timestamps in durable contracts.
- Application-managed passwords, implicit OAuth flow, browser-stored long-lived tokens, or identity claims as direct trade authority.
- Production on the existing shared EC2 host by assumption.

## 10. Cost and Operational Implications

Local development runs two stateful infrastructure services. Staging can reuse the existing AWS host only after strict isolation from Astro Sling and with measured resource headroom. Production managed compute, database, cache, secrets, object storage, load balancing, logs, transfer, and backups create recurring costs; budgets, tags, retention, and alarms are mandatory before provisioning. No current price is asserted because region, size, traffic, retention, and provider pricing can change.

Turborepo caching and focused CI jobs control build cost. Telemetry cardinality, raw-data retention, historical backfills, provider calls, RPC subscriptions, and egress are expected cost drivers and require budgets.

## 11. Security Implications

The stack is secure only when configured correctly. Dependencies and container images require pinning, review, scanning, and timely supported-version upgrades. Fastify schemas validate all transport input and constrain output. Database and Redis remain private, encrypted in transit where supported, and least-privileged. Secrets remain outside Git and enter runtime through approved secret stores.

Authentication and authorization are separate: Cognito proves identity, while the application evaluates versioned capabilities. Administrative, paper, wallet, and any future live operations are distinct. Risk Manager, transaction simulation, re-authentication, emergency stop, and audit gates remain future mandatory controls and are not implemented in this sprint.

## 12. Migration and Exit Strategy

- Domain packages depend on internal ports, not Fastify, Drizzle, BullMQ, Redis, Cognito, AWS, chain SDKs, or provider SDKs.
- OpenAPI and event envelopes provide transport contracts.
- SQL migrations and standard PostgreSQL types preserve database portability; AWS-specific extensions require separate ADRs.
- The job port and transactional outbox allow BullMQ to be replaced by SQS/RabbitMQ/Kafka without rewriting producers.
- OpenTelemetry exports through standard protocols so the telemetry backend can change.
- OCI-compatible containers move from Compose to ECS or another orchestrator.
- OIDC/OAuth boundaries and application-owned authorization limit identity-provider coupling.
- Raw provider references plus normalized records support reprocessing through replacement adapters.

## 13. Decision Dependencies

Sprint 0.3 depends on ADR-0002 through ADR-0019 and will implement tooling only. Chain and provider work depends on adapter/event/data contracts. Scoring depends on exact numeric/time policy and versioned provenance. Paper trading depends on reproducible event/data pipelines and deterministic testing. Wallet and live trading remain blocked by later custody, threat-model, authorization, simulation, and operational ADRs.

## 14. Risks

- TypeScript types can create false confidence without runtime schemas.
- Node workers can block the event loop with CPU-heavy analysis.
- Drizzle is younger than some alternatives and migration output requires review.
- Redis/BullMQ durability can be misconfigured; PostgreSQL outbox and idempotency are mandatory.
- Shared-host staging can affect Astro Sling or inherit host compromise without isolation.
- Cognito creates AWS coupling and requires careful token/session design.
- OTel telemetry can leak sensitive data or create high-cardinality cost.
- A modular monolith can decay into cross-module coupling without dependency tests.
- Time-series and raw payload growth can exceed initial PostgreSQL/storage assumptions.

## 15. Validation Plan

Sprint 0.3 will validate runtime/package-manager support, workspace task graphs, Windows and WSL2 setup, frozen lockfile installs, formatting/lint/type/test/build gates, container health, PostgreSQL/Redis connectivity, migration rehearsal, Fastify health endpoints, structured logs, OTel smoke signals, Testcontainers, Playwright, secret/dependency scanning, and a minimal GitHub Actions workflow. No domain behavior will be implemented.

Later spikes must measure WebSocket fan-out, BullMQ failure/retry semantics, PostgreSQL partition/query behavior, provider rate limits, OTel overhead/cardinality, Cognito session/lockout flow, staging host isolation, backups/restores, and ECS cost/reliability before promotion.

## 16. Sources and Evidence Notes

Research was performed on 2026-07-19 using official documentation and primary project sources. Exact versions and prices are intentionally not fixed.

- [Node.js release policy and supported releases](https://nodejs.org/en/about/previous-releases)
- [Node.js end-of-life security implications](https://nodejs.org/en/about/eol)
- [Fastify validation and serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
- [Fastify logging and redaction](https://fastify.dev/docs/latest/Reference/Logging/)
- [React documentation](https://react.dev/)
- [Vite guide and browser policy](https://vite.dev/guide/)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Turborepo documentation](https://turborepo.com/docs)
- [PostgreSQL data types, including exact numeric and JSONB](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL table partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)
- [Drizzle migration approaches](https://orm.drizzle.team/docs/migrations)
- [Redis persistence tradeoffs](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
- [Redis distributed-lock safety considerations](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)
- [BullMQ documentation](https://docs.bullmq.io/)
- [RabbitMQ reliability guidance](https://www.rabbitmq.com/docs/reliability)
- [Amazon SQS visibility and at-least-once behavior](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [OpenTelemetry overview](https://opentelemetry.io/docs/)
- [OpenTelemetry JavaScript signal status](https://opentelemetry.io/docs/languages/js/)
- [Vitest guide](https://vitest.dev/guide/)
- [Playwright browser coverage](https://playwright.dev/docs/browsers)
- [Testcontainers for Node.js](https://node.testcontainers.org/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Desktop WSL2 guidance](https://docs.docker.com/desktop/features/wsl/)
- [GitHub Actions security hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [GitHub dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review)
- [Amazon ECS Fargate security considerations](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-security-considerations.html)
- [Amazon ECS network security](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-network.html)
- [Amazon RDS encryption](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)
- [AWS Secrets Manager best practices](https://docs.aws.amazon.com/secretsmanager/latest/userguide/best-practices.html)
- [Amazon Cognito security best practices](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-security-best-practices.html)
- [Amazon Cognito app-client OAuth flows](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)

External verification remains required before implementation for package/container compatibility, licensing, exact support windows, AWS regional availability/pricing, Redis-compatible managed-service behavior with BullMQ, and provider/chain SDK maturity.
