# Database Standard

## Purpose

Define technology-independent data integrity, lineage, security, lifecycle, and migration expectations for future persistence.

## Binding Principles

Data must be attributable, time-aware, reproducible, access-controlled, and recoverable. Raw observations, normalized facts, derived findings, decisions, audits, paper state, and future live state have distinct semantics. Persistence technology follows requirements, not preference.

## Mandatory Rules

- Use PostgreSQL as primary transactional truth and Drizzle as the initial access layer.
- Define ownership, identifiers, chain/network context, units, precision, timestamps, provenance, quality, and retention for each dataset.
- Preserve raw evidence or an integrity-verifiable reference where policy permits; version transformations, scores, rules, and schemas.
- Use reviewed, reversible migrations with compatibility, backup, restore, and rollback plans.
- Enforce least privilege, encryption requirements, redaction, audit access, and environment separation.
- Design idempotency, uniqueness, concurrency, ordering, finality/reorganization, and deletion semantics explicitly.
- Validate backup restoration and data reconciliation, including paper versus any future live context.
- Generate, review, commit, and CI-test SQL migrations against clean and supported prior states; shared environments prohibit direct schema push, automatic synchronization, and application-startup migrations.
- Keep Redis ephemeral/reconstructable; use object storage for justified immutable large raw artifacts with PostgreSQL provenance/index metadata.
- Store raw token units as exact integers and financial values as declared numeric precision/scale; durable timestamps are UTC and preserve separate source/ingestion semantics.

## Prohibited Practices

Do not store secrets or private keys in general databases, mutate historical evidence without trace, run unreviewed production migrations, use destructive schema changes without recovery, mix environments, conceal missing provenance, or select a database before documented evaluation.

## Accepted Technology Direction

PostgreSQL constraints/transactions protect identity, configuration, idempotency, assessments, paper state, and audit metadata. JSONB is bounded evidence, not an excuse for missing schemas. High-volume time/event/audit tables are partition candidates only after query/volume measurement.

## Future Detail

Full schemas, indexes, partition keys, extensions, retention, archival format, residency, field encryption, RPO/RTO, and managed RDS sizing remain later decisions.
