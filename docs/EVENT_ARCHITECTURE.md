# Event Architecture

## Purpose

Events decouple bounded contexts and support asynchronous work while preserving traceability. BullMQ is the initial worker transport, but event contracts are transport-neutral. PostgreSQL transactional outbox records durable publication intent.

## Naming Convention

Use lower-case dot-separated past-tense domain facts with a terminal major contract version:

```text
<context>.<fact>.v<major>
```

Examples:

- chain.block.observed.v1
- token.discovered.v1
- pool.discovered.v1
- market.snapshot.collected.v1
- security.assessment.completed.v1
- risk.assessment.completed.v1
- alpha.score.calculated.v1
- paper.order.requested.v1
- paper.order.executed.v1
- notification.requested.v1

Commands are explicitly named requests and are not presented as completed facts. Minor backward-compatible schema evolution stays within a major event name and increments schema metadata; breaking changes receive a new event major.

## Event Envelope

Every published event conceptually contains:

| Field | Meaning |
| --- | --- |
| event_id | Globally unique immutable identifier |
| event_name | Namespaced name including contract major |
| event_version | Semantic event contract version |
| schema_version | Exact envelope/payload schema revision |
| occurred_at | UTC time the domain fact occurred |
| observed_at | Source/chain time when distinct and available |
| ingested_at | UTC platform acceptance time |
| correlation_id | End-to-end workflow identifier |
| causation_id | Event/command that directly caused this event |
| producer | Bounded context and artifact/version identity |
| tenant/actor | Authorized context when applicable and minimized |
| chain_context | Chain/network, block, transaction/log identity, confirmation state when applicable |
| payload | Versioned normalized data; no secrets or raw provider SDK objects |
| provenance | Source/provider, request/raw reference, adapter version, freshness/quality |
| trace_context | Validated W3C trace context or internal trace reference |

Large raw results are referenced by integrity-verifiable object metadata, not embedded.

## Publication and Transactional Outbox

When a database state change and event belong to one business transaction, write the domain state and outbox record atomically in PostgreSQL. A publisher claims outbox records, emits to the job/event transport, records attempts, and marks publication without deleting audit history prematurely. Publisher crashes can cause duplicates; consumers must be idempotent.

## Delivery Semantics

The system assumes **at least once** delivery. It does not claim exactly once. Acknowledgement occurs only after the consumer's durable state transition succeeds. Consumers validate envelope/name/version and reject unsupported contracts safely. Timeouts, visibility/lock duration, heartbeat, concurrency, and acknowledgement policy are explicit per job type.

## Retry Policy

- Classify errors as transient, rate-limited, permanent-input, policy, authentication, provider, or internal.
- Retry only retryable errors with bounded exponential backoff and jitter.
- Respect provider retry-after/rate-limit state and total deadline.
- Do not retry validation, authorization, unsupported version, or deterministic policy failures unchanged.
- Record attempt count, next attempt, last error class, and correlation.
- Side effects remain idempotent across every retry.

## Dead-Letter and Poison Messages

After bounded attempts or a non-retryable consumer failure, move the job/event to a quarantine/dead-letter queue with the original immutable envelope, error classification, consumer/version, attempts, timestamps, and redacted diagnostic reference. Alert by severity. Redrive requires authorized review, a documented fix or rationale, compatibility validation, and a new audit record; it never edits the original message silently.

## Idempotency

Consumer idempotency uses event ID and business key. Where practical, record consumption and state transition in one PostgreSQL transaction. External side effects use provider idempotency keys or a durable intent/result state machine. Notifications, paper fills, future execution, and configuration changes require domain-specific duplicate protection.

## Ordering

Global ordering is not assumed. Ordering is declared only for a meaningful partition key such as chain/block lineage, asset/pool, strategy run, paper order, or portfolio. Consumers reject or defer impossible transitions and reconcile gaps. Chain reorgs produce correction/reversal facts; they do not rewrite history.

## Replay

Replay sources immutable envelopes or reconstructed canonical data into an isolated run ID and target. Replays declare contract/schema/config/code versions, time range, ordering policy, and side-effect mode. External notifications, paper mutation, and all future live execution are disabled unless the replay target explicitly provides a safe simulator. Replay results never masquerade as original production facts.

## Consumer Isolation

Consumers have their own queue/concurrency/retry/dead-letter policy and least-privilege data access. Slow historical backfills cannot starve discovery, risk, alerts, or future safety controls. CPU-heavy work runs in separate worker processes. One consumer cannot mutate another context's private tables.

## Event Types and Intended Consumers

| Event | Producer | Typical consumers |
| --- | --- | --- |
| chain.block.observed.v1 | Chain Ingestion | discovery, reconciliation, observability |
| token.discovered.v1 | Token Discovery | market enrichment, security, notifications |
| pool.discovered.v1 | Token Discovery | market enrichment, security |
| market.snapshot.collected.v1 | Market Data | potential, risk, strategy, paper valuation |
| security.assessment.completed.v1 | Security Intelligence | risk, audit, notifications |
| risk.assessment.completed.v1 | Risk Assessment | alpha, strategy visibility, audit |
| alpha.score.calculated.v1 | Alpha Ranking | strategy, dashboard, notifications |
| paper.order.requested.v1 | Strategy Evaluation | Paper Trading only |
| paper.order.executed.v1 | Paper Trading | Portfolio, audit, dashboard |
| notification.requested.v1 | Any authorized context | Notification only |

These are contract examples, not implemented schemas or code.

## Audit Relationship

Operational events and audit records serve different purposes. Security, authorization, configuration, scoring/strategy decisions, paper lifecycle, and future execution events cause an append-only audit record with actor, versions, gate outcome, and correlation. Telemetry or queue retention cannot be the sole audit source. Audit consumers are isolated and normal event replay cannot mutate prior audit history.

## Monitoring

Measure queue depth/age, active/stalled jobs, retry rate, dead-letter count, outbox backlog/age, publication latency, consumer lag, handler duration, duplicate rate, unsupported schema count, and freshness by pipeline. Alert on safety-critical backlog, poison-message bursts, and replay crossing an unsafe boundary.

## Evolution Rules

Schemas are owned in shared contracts, compatibility-tested, additive by default, and documented. Producers support the current contract; consumers tolerate documented additive fields. Breaking semantic changes create a new major event. Deletion waits until all consumers and retained replay windows no longer need the old version.
