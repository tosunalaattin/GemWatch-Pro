# Data Architecture

## Scope

PostgreSQL is the primary transactional source of truth; Redis is ephemeral coordination/cache and BullMQ transport; object storage retains large immutable raw artifacts and exports when justified. This document defines semantics, not tables or complete SQL.

## Data Classifications

| Class | Examples | Default handling |
| --- | --- | --- |
| Public | Public chain identifiers and published market facts | Integrity and provenance controls |
| Internal | Normalized observations, scores, system configuration | Authenticated access and environment separation |
| Restricted | User records, strategy definitions, paper positions, provider account metadata | Least privilege, encryption, audit, minimized export |
| Critical | Risk policy, future wallet/execution data, security incidents, audit integrity metadata | Strong separation, re-authentication where applicable, immutable audit |
| Secret | Credentials, API secrets, seed phrases, private keys | Never in repository, database payloads, telemetry, fixtures, or AI context |

## Source-of-Truth Rules

- PostgreSQL owns canonical transactional records, durable idempotency, configuration versions, normalized facts, assessments, paper orders/positions, and audit metadata.
- A chain is authoritative for its finalized/confirmed public state, but observations remain versioned by block lineage and confirmation policy.
- Provider data is evidence, never unquestioned truth. Conflicts and missing data remain visible.
- Redis data is disposable/rebuildable unless a queue-specific durability policy says otherwise; it never owns financial balances, execution authorization, or audit.
- Object storage may own immutable raw blobs referenced by hash/URI; PostgreSQL owns their index, provenance, retention, and integrity metadata.
- Derived read models can be rebuilt from canonical records and versioned events.

## Canonical Identifiers

- **Chain ID:** A namespaced identifier containing ecosystem plus canonical network identifier; display names are not keys.
- **Asset ID:** Internal immutable identifier mapped to chain/network and asset identity; native assets are distinguished from contracts.
- **Token contract identity:** Chain ID plus normalized contract address and token standard; address comparison follows chain-specific rules.
- **Pool identity:** Chain ID plus protocol/factory identity and normalized pool contract/address or canonical pool key; token ordering is explicit.
- **Wallet identity:** Chain ID plus normalized address/account identity; cross-chain or real-world links are versioned hypotheses, not identity equality.
- **Provider identity:** Stable internal provider and capability identifier independent of endpoint or credential.
- Identifiers carry schema version and never rely on symbols, names, URLs, or provider-local IDs alone.

## Raw and Normalized Data

Raw data is immutable evidence retained inline only when bounded and safe, otherwise in object storage with content hash, media type, size, provider request metadata, received time, and redaction status. Normalized data uses internal contracts, exact units, canonical IDs, UTC timestamps, provenance, freshness, confidence/quality, and normalization version.

Normalization never overwrites raw evidence or hides conflicts. Untrusted content is size-bounded, encoded safely, excluded from logs, and not executed or rendered without sanitization. Raw retention must respect licensing, privacy, and cost.

## Data Workload Classes

- **Transactional data:** users, roles, configuration, idempotency, strategy versions, paper orders/fills/positions, risk gates, and future execution metadata. Requires ACID boundaries and constraints.
- **Time-series data:** market snapshots, chain observations, provider health, valuations, and pipeline measurements. Append-oriented, partition candidates, and retention-aware.
- **Event data:** versioned domain/integration envelopes, outbox state, consumer checkpoints, attempts, and quarantine references.
- **Audit data:** append-only security/decision/change records with actor, correlation, versions, outcome, and integrity metadata.
- **Derived scores:** Risk, Potential, and Alpha assessment versions with exact inputs, feature versions, explanation, uncertainty, and calculation time.
- **Model/version metadata:** rule, strategy, scoring, dataset, prompt/model, adapter, schema, configuration, rounding, and code/artifact versions.

## Provenance, Freshness, and Confidence

Every external or derived fact records source/provider identity, request/observation identifier, observed-at time, ingested-at time, normalized-at time, chain context and block where applicable, raw reference, adapter/schema version, and quality status. Freshness is calculated from policy against observed and ingested time, not inferred from record creation alone. Confidence is a qualified signal with method/version; it never converts uncertain evidence into fact.

## Idempotency and Deduplication

- Durable commands and side effects use caller/operation-scoped idempotency keys stored transactionally in PostgreSQL.
- Events use globally unique event IDs; consumers persist processed-event or business-deduplication state with the state change where practical.
- Chain events deduplicate by chain, block lineage, transaction/log identity, and event index as applicable; reorg reversals are explicit.
- Provider records use provider request/result identity plus canonical content/business keys.
- Redis may accelerate deduplication but cannot be the sole correctness record.
- Exactly-once delivery is not claimed; effects are idempotent under at-least-once delivery.

## Numeric Precision

Token raw amounts are arbitrary-size integers or decimal-safe strings at boundaries and exact database numeric/integer representations at rest. Display amounts require explicit token decimals. Prices, fiat amounts, rates, fees, and scores use declared precision and scale. JavaScript number is limited to safe non-financial counters or explicitly approximate telemetry. A centralized, versioned rounding policy defines mode, scale, direction, and context; float equality/ordering never controls a financial decision.

## Time

Durable timestamps are UTC with explicit timezone/offset at boundaries. Chain/block time, provider-observed time, source-event time, ingestion time, processing time, and decision time are distinct fields. Monotonic clocks measure durations; wall clocks record events. Missing or implausible source times are quality findings, not silently replaced.

## Retention and Archival

Retention is defined per classification and legal/provider constraint before collection. Transactional state follows business lifecycle; raw and high-volume observations use tiered retention; audit retention is longer and access-restricted; secrets are not retained in data payloads. Expired immutable bulk data moves to encrypted object storage or is deleted through audited jobs. Retention durations remain deferred until data volume, licensing, operational, and legal requirements are validated.

## Partitioning Direction

Do not partition prematurely. Candidates are high-volume append-only market observations, chain events, audit records, and outbox/history tables, generally by time with chain/provider sub-indexing. Partition keys must preserve common query paths and unique/deduplication constraints. Partition creation, pruning, late data, reorg correction, archive, and restore are migration-tested.

## Backup Classes

- **Class A critical transactional/audit metadata:** encrypted automated backups, point-in-time recovery where supported, frequent restore tests, and stricter future RPO/RTO.
- **Class B reconstructable normalized/derived data:** backups based on reconstruction cost and source availability.
- **Class C cache/ephemeral:** no business backup; configuration and queue recovery procedures are tested.
- **Class D immutable raw/object data:** versioning or lifecycle policy, integrity checks, and cross-failure-domain strategy according to requirements.

Numeric RPO/RTO and cross-region policy are deferred until production requirements.

## Encryption and Access

Use TLS for data in transit and managed encryption at rest for production stores and backups. Database roles map to API, worker, migration, read-only operations, and backup needs. Network access is private by default. Restricted/critical field-level encryption or tokenization requires threat modeling and key-rotation design. Encryption keys and secrets remain outside data rows and Git.

## PII Minimization and Deletion

Collect only identity attributes needed for access and audit. Public wallet addresses are not automatically harmless; do not attach unsupported real-world identities. User deletion must remove or anonymize eligible PII while retaining legally/security-required audit facts with minimized identifiers. Immutable public-chain facts cannot be deleted from the chain, but platform indexes, labels, and PII associations follow documented policy.

## Schema Migration Rules

- Drizzle schema definitions generate SQL migration candidates; every SQL file is reviewed.
- Shared environments never use direct schema push or automatic synchronization.
- Migrations are forward-only by default with an explicit rollback/forward-fix and data-reconciliation plan.
- CI validates a clean database and an upgrade from the supported previous schema state.
- Destructive/locking operations require measured impact, backup, maintenance/online strategy, and approval.
- Expand-and-contract changes preserve compatibility across deployments.
- Migration execution uses a dedicated least-privilege role/job and records artifact, actor, time, and result.
- Drift detection fails deployment; production never mutates schema from application startup.

## Deferred Design

Full SQL schema, exact indexes, extensions, partition schedule, retention durations, RPO/RTO, data residency, object format, compression, and archive region require measured Sprint/phase-specific decisions.
