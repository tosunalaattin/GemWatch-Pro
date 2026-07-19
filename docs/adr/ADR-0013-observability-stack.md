# ADR-0013: Observability Stack

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Observability Architecture](../OBSERVABILITY_ARCHITECTURE.md), [Security Standard](../SECURITY_STANDARD.md)

## Context

Real-time provider, chain, queue, scoring, strategy, and paper workflows need correlated diagnostics without locking instrumentation to one vendor or confusing telemetry with audit.

## Decision Drivers

Vendor independence, correlation, traces/metrics/logs, redaction, cardinality/cost, testability, and AWS portability.

## Considered Options

OpenTelemetry, vendor-specific SDKs, and structured logs only.

## Decision

Use OpenTelemetry APIs/SDKs for traces and metrics, W3C context propagation, and an OTel-compatible collector/export path. Emit structured JSON logs with trace/correlation fields. Treat JavaScript OTel logs cautiously while official status is developing. Maintain append-only audit separately.

## Consequences

### Positive

Portable instrumentation and cross-process/provider/queue visibility.

### Negative

Collector/exporter, semantic, sampling, retention, and cardinality governance add work.

### Risks

Sensitive-data leakage, excessive telemetry cost, unstable log integration, or observability outage affecting applications.

## Rejected Alternatives

Vendor SDKs create lock-in; logs alone cannot measure lag/freshness or cross-worker causality.

## Implementation Constraints

Allowlisted attributes, tested redaction, bounded cardinality, no secrets/raw payloads, audit never sampled, telemetry failure degrades diagnostics not safety, and backend/exporter remains replaceable.

## Validation Criteria

Correlation across API/outbox/worker, redaction tests, trace/metric smoke test, exporter outage, sampling, cardinality budget, health/readiness, and critical alert simulation.

## Review Conditions

Review OTel signal maturity, backend economics, sampling requirements, or operational complexity with measured telemetry volume.
