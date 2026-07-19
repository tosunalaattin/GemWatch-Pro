# ADR-0001: Repository as the Source of Truth

- **Status:** Accepted
- **Date:** 2026-07-19

## Context

GemWatch Pro will be developed across multiple sprints and may involve different human and AI contributors. Chat histories, local notes, and remembered decisions are incomplete, non-durable, difficult to review, and unavailable to future sessions. The project needs a versioned and auditable location for code, technical documentation, current state, and handoff knowledge.

## Decision

The GitHub repository is the single source of truth for code, technical documentation, project state, and AI handoff information. Work is not considered part of the project record until it is represented in the repository. Contributors must inspect repository state before acting, persist material decisions and sprint outcomes, and disregard chat context that conflicts with current repository evidence.

## Consequences

Changes become reviewable, versioned, portable, and recoverable through Git history. Sprint closure must update living state and handoff documents. Documentation maintenance is part of delivery cost. Sensitive values cannot be used as project memory because secrets must never enter Git. External systems may mirror or discuss work, but they do not replace the repository record.

## Alternatives Considered

- **Chat history as memory:** Rejected because sessions are incomplete, mutable in availability, and not a reviewable project artifact.
- **External wiki or task tracker as authority:** Rejected as the primary source because it can drift from code and may not be available to every contributor; it may remain a linked coordination aid.
- **Local uncommitted files:** Rejected because they are not shared, durable, or auditable.
- **Multiple equal sources:** Rejected because conflicts would lack a deterministic resolution path.

## Review Conditions

Review this decision if repository governance becomes legally or operationally insufficient, if required artifact classes cannot safely be stored in Git, or if an approved platform offers stronger versioning and traceability. Any revision must preserve a deterministic authority order, migration and audit history, access controls, and the prohibition on storing secrets.
