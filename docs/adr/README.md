# Architecture Decision Records

Architecture Decision Records preserve the context, choice, and consequences of material decisions. Create an ADR before implementing a decision that significantly affects architecture, security, data, operations, technology, providers, or long-term maintainability. Never rewrite accepted history to hide a change; add a superseding ADR.

## File Naming

Use `ADR-NNNN-short-kebab-case-title.md` with the next sequential number.

## Required Format

New ADRs use:

1. Title
2. Status
3. Date
4. Decision owners
5. Related documents
6. Context
7. Decision Drivers
8. Considered Options
9. Decision
10. Consequences with Positive, Negative, and Risks
11. Rejected Alternatives
12. Implementation Constraints
13. Validation Criteria
14. Review Conditions

ADR-0001 predates this expanded format and remains valid historical evidence; do not rewrite it solely for formatting.

## Statuses

- **Proposed:** Open for evaluation and not binding.
- **Accepted:** Approved and binding for applicable work.
- **Rejected:** Evaluated but not selected.
- **Deprecated:** Retained for history but discouraged pending replacement.
- **Superseded:** Replaced by a named later ADR.

Record evidence, assumptions, benefits, costs, security and operational impact, and unresolved questions. Link related ADRs, issues, specifications, and implementation changes.

## Current Index

- [ADR-0001: Repository as the Source of Truth](ADR-0001-repository-as-source-of-truth.md)
- [ADR-0002: Modular Monolith First](ADR-0002-modular-monolith-first.md)
- [ADR-0003: Primary Language and Runtime](ADR-0003-primary-language-and-runtime.md)
- [ADR-0004: Web Application Stack](ADR-0004-web-application-stack.md)
- [ADR-0005: Backend Framework](ADR-0005-backend-framework.md)
- [ADR-0006: Monorepo and Package Management](ADR-0006-monorepo-and-package-management.md)
- [ADR-0007: Primary Database](ADR-0007-primary-database.md)
- [ADR-0008: Data Access and Migrations](ADR-0008-data-access-and-migrations.md)
- [ADR-0009: Cache and Ephemeral State](ADR-0009-cache-and-ephemeral-state.md)
- [ADR-0010: Asynchronous Jobs and Messaging](ADR-0010-asynchronous-jobs-and-messaging.md)
- [ADR-0011: API and Real-Time Communication](ADR-0011-api-and-realtime-communication.md)
- [ADR-0012: Provider and Chain Adapter Architecture](ADR-0012-provider-adapter-architecture.md)
- [ADR-0013: Observability Stack](ADR-0013-observability-stack.md)
- [ADR-0014: Testing Strategy and Tooling](ADR-0014-testing-strategy-and-tooling.md)
- [ADR-0015: Local Development Platform](ADR-0015-local-development-platform.md)
- [ADR-0016: Continuous Integration Strategy](ADR-0016-continuous-integration-strategy.md)
- [ADR-0017: AWS Deployment Strategy](ADR-0017-aws-deployment-strategy.md)
- [ADR-0018: Authentication and Authorization Boundary](ADR-0018-authentication-and-authorization-boundary.md)
- [ADR-0019: Numeric Precision and Time Policy](ADR-0019-numeric-precision-and-time-policy.md)

Sprint 0.3 implemented ADR-0002–ADR-0019 without changing their decisions. Runtime pins, ESM/configuration/health/workspace/CI/update policies were recorded as MEM-031–MEM-037 and implementation documents because they refine the accepted stack rather than select a new architecture; no ADR-0020 was required.
