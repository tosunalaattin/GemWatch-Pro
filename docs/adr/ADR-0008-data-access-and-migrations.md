# ADR-0008: Data Access and Migrations

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Data Architecture](../DATA_ARCHITECTURE.md), [Database Standard](../DATABASE_STANDARD.md)

## Context

Type-safe application access must retain SQL control for transactions, partitions, exact types, indexes, and high-volume tables. Schema changes need reviewable and repeatable operations.

## Decision Drivers

Migration reliability, SQL visibility, type safety, raw SQL, transactions, drift detection, testability, and long-term maintenance.

## Considered Options

Drizzle, Prisma, and TypeORM.

## Decision

Use Drizzle for PostgreSQL access and schema definitions. Generate SQL migration files, review them, commit them, test clean/upgrade paths, and apply through an explicit deployment job. Direct schema push is limited to disposable local experimentation and not the shared workflow.

## Consequences

### Positive

Thin type-safe SQL layer and transparent migrations with full SQL escape path.

### Negative

The team owns SQL quality and Drizzle has a younger ecosystem than some alternatives.

### Risks

Generated SQL can still lock or lose data; raw SQL can bypass safety; schema drift can emerge.

## Rejected Alternatives

Prisma has stronger onboarding but less direct advanced-SQL fit; TypeORM adds heavier runtime/entity behavior and automatic sync risk.

## Implementation Constraints

No production startup migrations, no automatic sync, parameterized queries, transaction ownership, migration role, drift checks, expand-contract, backup, rollback/forward-fix, and reconciliation.

## Validation Criteria

CI builds a clean database and upgrades the supported prior state, inspects generated SQL, tests rollback/forward recovery, and detects drift.

## Review Conditions

Review if Drizzle cannot safely represent required PostgreSQL capabilities or its support/maintenance no longer meets project needs.
