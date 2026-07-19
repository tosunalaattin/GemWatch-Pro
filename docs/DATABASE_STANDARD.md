# Database Standard

## Purpose

Define technology-independent data integrity, lineage, security, lifecycle, and migration expectations for future persistence.

## Binding Principles

Data must be attributable, time-aware, reproducible, access-controlled, and recoverable. Raw observations, normalized facts, derived findings, decisions, audits, paper state, and future live state have distinct semantics. Persistence technology follows requirements, not preference.

## Mandatory Rules

- Define ownership, identifiers, chain/network context, units, precision, timestamps, provenance, quality, and retention for each dataset.
- Preserve raw evidence or an integrity-verifiable reference where policy permits; version transformations, scores, rules, and schemas.
- Use reviewed, reversible migrations with compatibility, backup, restore, and rollback plans.
- Enforce least privilege, encryption requirements, redaction, audit access, and environment separation.
- Design idempotency, uniqueness, concurrency, ordering, finality/reorganization, and deletion semantics explicitly.
- Validate backup restoration and data reconciliation, including paper versus any future live context.

## Prohibited Practices

Do not store secrets or private keys in general databases, mutate historical evidence without trace, run unreviewed production migrations, use destructive schema changes without recovery, mix environments, conceal missing provenance, or select a database before documented evaluation.

## Future Detail

Database category and products, schemas, indexing, partitioning, consistency levels, retention periods, encryption mechanisms, archival, residency, privacy controls, and recovery objectives require research and ADRs.
