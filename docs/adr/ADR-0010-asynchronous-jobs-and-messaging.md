# ADR-0010: Asynchronous Jobs and Messaging

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Event Architecture](../EVENT_ARCHITECTURE.md), [Technology Evaluation](../TECHNOLOGY_EVALUATION.md)

## Context

Discovery, enrichment, security/risk/score work, notifications, backfills, and paper simulation need retries and independent worker concurrency without day-one broker complexity.

## Decision Drivers

TypeScript integration, local parity, retries/dead letters, cost, worker scaling, durability, portability, and operational simplicity.

## Considered Options

PostgreSQL-backed queue, BullMQ/Redis, RabbitMQ, Kafka, and AWS SQS.

## Decision

Use BullMQ on Redis behind an internal job port. Persist business publication intent in a PostgreSQL transactional outbox. Assume at-least-once delivery; use idempotent consumers, bounded retry/backoff, poison-message quarantine/dead-letter handling, per-workload queues, and replay controls.

## Consequences

### Positive

Reuses Redis, fits Node workers, and supports delayed/retry/concurrency patterns with local parity.

### Negative

Redis durability and PostgreSQL-to-queue atomicity require explicit outbox/publisher design.

### Risks

Duplicate effects, stalled jobs, queue data loss, starvation, poison loops, or unsafe replay.

## Rejected Alternatives

PostgreSQL queues compete with primary workload; RabbitMQ adds operations; Kafka is premature; SQS is a strong future option but creates initial AWS/local divergence.

## Implementation Constraints

Validated versioned envelopes, no secrets, durable idempotency, ack after state commit, bounded payloads, separate critical/backfill queues, correlation, quarantine/redrive audit, and no queue path around Risk Manager.

## Validation Criteria

Failure-injection tests cover crash before/after commit/ack, duplicates, retries, rate limits, stalled workers, dead letters, redrive, outbox lag, ordering partitions, and safe replay.

## Review Conditions

Review for SQS, RabbitMQ, or Kafka when managed operations, routing, durable replay, throughput, or multi-service ownership is measured and the job port proves migration boundaries.
