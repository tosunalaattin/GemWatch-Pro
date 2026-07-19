# Observability Architecture

## Principles

OpenTelemetry defines vendor-neutral trace and metric instrumentation. Structured JSON logs use Pino-compatible semantics and carry correlation fields; they may be correlated/exported through an OTel collector as support matures. Audit is a separate append-only security record. Telemetry is not a source of business truth and must never contain secrets, seed phrases, private keys, auth tokens, full provider payloads, or transaction signing material.

## Signal Model

### Logs

Emit structured JSON to stdout with UTC timestamp, severity, service/process, environment, version, message/event code, correlation_id, trace_id/span_id when present, context/module, safe identifiers, outcome, duration, and classified error. Avoid free-form dynamic keys and high-cardinality payloads. Local pretty-printing is a developer transform, not the canonical production format.

### Metrics

Use bounded-cardinality names/attributes, documented units, and ownership. Core directions include request rate/error/latency, provider calls/latency/quota/freshness, chain head and ingestion lag, outbox/queue depth and age, retries/dead letters, database pool health, Redis health, assessment throughput/latency, scoring version, strategy outcomes, paper reconciliation, notification delivery, authentication failures, and emergency-stop state.

Never label metrics with wallet address, token address, transaction hash, event ID, user email, raw error text, or arbitrary provider content. Such identifiers belong in correlated logs/audit with access controls.

### Traces

Trace inbound API/WebSocket operations, provider/RPC requests, outbox publication, queue handling, database calls at safe granularity, security/risk/score/strategy pipelines, notification delivery, and paper lifecycle. Propagate W3C trace context only after validation; generate internal correlation when external headers are invalid. Use links for batch/fan-out and replay relationships.

### Audit Events

Audit authentication/authorization, configuration, data-source policy, scoring/strategy versions, Risk Manager gates, paper actions, future wallet/live controls, administrative access, migration, deployment, and emergency actions. Audit records include actor/service, action, target, correlation, input/version references, decision, reason, time, environment, and integrity metadata. They are never sampled.

## Correlation Propagation

Every ingress establishes a validated correlation ID and trace. Correlation, causation, run/replay, job, and event IDs propagate across the outbox and queue envelope. Logs and audit reference the same IDs. Client-supplied IDs are length/format bounded and cannot overwrite protected internal identity fields.

## Redaction and Sensitive Data

Use allowlists before telemetry leaves a boundary. Redact authorization/cookie headers, query secrets, credentials, provider tokens, personal data, raw request/response bodies, wallet/key material, and future transaction signing content. Hashing does not automatically anonymize low-entropy values. Error objects use safe serializers. Redaction rules are tested and versioned.

## Sampling

Metrics and audit are not sampled. Keep error and critical safety traces when safe. Use head sampling initially for normal traces and consider tail sampling only through a controlled collector when volume justifies it. Sampling decisions and rates are configuration; any route/provider/strategy-specific sampling avoids sensitive labels and uncontrolled cost.

## Retention

Retention differs by signal, environment, classification, diagnostic value, incident needs, and cost. Development retention is short; staging supports release/incident diagnosis; production requires approved durations. Audit retention is governed separately and generally longer. Raw debug logs are never enabled indefinitely in production.

## Alert Severity

| Severity | Meaning | Direction |
| --- | --- | --- |
| Critical | Safety boundary failure, suspected key/credential compromise, audit loss, live emergency indicator, or broad outage | Immediate page and emergency procedure |
| High | Risk pipeline unavailable/stale, sustained chain/provider outage, failed backup/restore, auth abuse, or severe queue backlog | Urgent operator response |
| Medium | Degraded provider, elevated retries/errors, delayed non-critical jobs, paper mismatch | Timely investigation |
| Low | Early trend, capacity warning, non-urgent drift | Planned review |
| Info | Deployment, recovery, configuration, expected lifecycle | Searchable record |

Alerts require owner, runbook, deduplication, silence/maintenance policy, and resolution evidence. Alert text makes no financial guarantee.

## SLO Direction

Numeric SLOs are deferred until representative workloads. Define SLOs for API availability/latency, token discovery and market freshness, chain ingestion lag, risk/score pipeline completion, job age, notification delivery, paper reconciliation correctness, audit acceptance, backup/restore, and future execution safety. Correctness and safety gates are not traded away to meet latency targets.

## Health Endpoints

- **Liveness:** Process event loop/worker loop is responsive; it does not require every dependency to be healthy.
- **Readiness:** The process can safely serve its assigned role and critical dependencies/config/schema are compatible.
- **Startup:** Initialization and migration compatibility are complete where platform support warrants it.
- Public health output is minimal; detailed dependency status requires operator authorization.

## Operational Views

- **Provider health:** latency, success/error class, quota/rate state, circuit state, freshness, disagreement, and cost proxy by capability.
- **Queue health:** depth, oldest age, active/stalled, retries, dead letters, outbox backlog, consumer lag and version.
- **Data freshness:** observed/ingested/processed lag by chain/provider/dataset with missing/conflicting evidence.
- **Chain ingestion:** provider head versus accepted head, confirmations, reorg count/depth, reconnects, gaps, and backfill progress.
- **Score pipeline:** assessment latency, feature completeness, rule/model/config/scoring version, failures, and recalculation backlog.
- **Strategy trace:** immutable input snapshot IDs, decision/rationale, rule version, risk gate request, and resulting paper intent.
- **Paper correctness:** order/fill/position reconciliation, balance invariants, duplicate protection, stale valuation, and replay drift.
- **Security:** auth failures, privilege changes, secret-scan findings, dependency/container findings, anomalous admin access, audit failures, and emergency-stop tests.
- **Future live emergency indicators:** Risk Manager bypass attempt, stale authorization, failed simulation, limit breach, wallet/signing error, reconciliation mismatch, unapproved configuration, emergency stop activation, and any live-capable component in a non-approved environment.

## Implementation Direction

Sprint 0.3 establishes structured logging, correlation, minimal OTel trace/metric smoke signals, and health contracts without choosing a permanent telemetry backend. Local development may use a lightweight collector/backend profile, but it must remain optional. AWS staging/production can initially export to CloudWatch-compatible storage while preserving OTel protocols.

## Validation

Test correlation across API/outbox/worker paths, redaction against seeded secrets, bounded metric cardinality, health behavior during dependency failure, sampling, exporter outage, queue/provider alerts, clock skew, and audit independence. Telemetry failure must not silently authorize business actions or block the emergency-stop path.

## Implemented Baseline

Sprint 0.3 added structured JSON logs with service/environment/version metadata, controlled errors, correlation fields, and credential/header redaction. OpenTelemetry Node bootstrap is vendor-neutral, disabled by default, optional through validated configuration, and closes gracefully. No collector, vendor backend, production sampling, retention, metric export, or audit log was selected.
