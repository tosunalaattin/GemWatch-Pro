# ADR-0009: Cache and Ephemeral State

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Data Architecture](../DATA_ARCHITECTURE.md), [Technology Evaluation](../TECHNOLOGY_EVALUATION.md)

## Context

API cache, rate limits, sessions, provider state, fan-out, and job coordination need low-latency shared state, while financial correctness and audit require durable authority.

## Decision Drivers

Latency, TTL semantics, distributed coordination, worker ecosystem, operational cost, and safe failure.

## Considered Options

Redis, PostgreSQL-only, and process-local memory.

## Decision

Use Redis for shared cache, rate limiting, sessions/revocation acceleration, temporary provider state, WebSocket fan-out, and BullMQ coordination. PostgreSQL remains authoritative for durable idempotency, financial state, risk authorization, and audit. Process-local caching is allowed only when correctness-independent.

## Consequences

### Positive

One shared ephemeral system supports multiple real-time use cases.

### Negative

Adds a stateful service, eviction, persistence, and failure policies.

### Risks

Treating cache as truth, unsafe distributed locks, data loss, memory exhaustion, or cross-environment key collisions.

## Rejected Alternatives

PostgreSQL-only creates high-churn contention; local memory cannot coordinate processes.

## Implementation Constraints

Private/TLS/authenticated access, namespaced keys, bounded TTL/memory, no secrets, reconstructable cache, authoritative fencing/idempotency in PostgreSQL, and Redis lock failure cannot authorize irreversible action.

## Validation Criteria

Tests cover expiry, eviction, outage, reconnect, namespace isolation, rate limits, session revocation, duplicate workers, and reconstruction without correctness loss.

## Review Conditions

Review if managed Redis compatibility, cost, durability, contention, or scale no longer meets queue/cache requirements.
