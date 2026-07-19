# ADR-0007: Primary Database

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Data Architecture](../DATA_ARCHITECTURE.md), [Database Standard](../DATABASE_STANDARD.md)

## Context

The platform will hold identities, configuration, chain/market facts, assessments, score versions, strategy decisions, paper orders/positions, idempotency, and audit metadata with relationships and exact values.

## Decision Drivers

Transactional consistency, constraints, exact numeric, JSON, indexing, partitioning, auditability, ecosystem, and AWS support.

## Considered Options

PostgreSQL, MySQL, and MongoDB.

## Decision

Use PostgreSQL as the primary transactional database. Use relational constraints and exact types first, JSONB for bounded variable evidence, and time partitioning only after measured need. Production direction is encrypted managed RDS PostgreSQL.

## Consequences

### Positive

One mature engine covers transactional, exact-numeric, JSON, indexing, and partition-ready workloads.

### Negative

High-volume time series and raw data require deliberate retention/partition/object-storage design.

### Risks

Unbounded JSONB, poor indexes, write growth, migration locks, or using the primary as every specialized store.

## Rejected Alternatives

MySQL is viable but a weaker combined fit; MongoDB flexibility does not outweigh relational financial/audit integrity.

## Implementation Constraints

Private networking, least-privilege roles, TLS/encryption, explicit schemas, reviewed migrations, backups/restores, and no secrets/private keys in application tables.

## Validation Criteria

Migration and Testcontainers tests prove constraints, transactions, exact numeric round-trip, JSON boundaries, idempotency, backup/restore direction, and representative query plans before scale.

## Review Conditions

Review for specialized time-series, search, graph, or archival stores only after PostgreSQL measurements and clear ownership/exit criteria.
