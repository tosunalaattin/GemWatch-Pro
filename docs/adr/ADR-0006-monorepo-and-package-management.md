# ADR-0006: Monorepo and Package Management

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Development Platform](../DEVELOPMENT_PLATFORM.md), [Technology Decision Matrix](../TECHNOLOGY_DECISION_MATRIX.md)

## Context

Apps, workers, domain modules, contracts, and shared tooling need one reproducible workspace with clear dependency boundaries and efficient CI.

## Decision Drivers

Strict dependencies, install reproducibility, task caching, Windows support, simple configuration, and scaling to a professional team.

## Considered Options

pnpm workspaces, npm workspaces, Yarn, Turborepo, and Nx. Package management and task orchestration were evaluated separately.

## Decision

Use pnpm workspaces as the sole package manager and Turborepo as the sole task orchestrator. Commit one pnpm lockfile and pin pnpm in Sprint 0.3.

## Consequences

### Positive

Efficient strict workspace installs and a small task graph/cache layer.

### Negative

Two tools require cache/input and workspace-policy maintenance.

### Risks

Incorrect cache inputs, dependency leakage, unreviewed install scripts, or mixed lockfiles.

## Rejected Alternatives

npm is a safe fallback but less strict/efficient; Yarn adds no decisive value; Nx is heavier than current governance needs.

## Implementation Constraints

Frozen CI installs, reviewed lockfile, no npm/Yarn lockfiles, explicit workspace dependencies, cache excludes secrets, and actions/tasks cannot bypass quality gates.

## Validation Criteria

Repeatable clean install, deterministic lockfile, correct task invalidation, Windows/CI parity, dependency-boundary failures, and no secret-bearing cache artifact.

## Review Conditions

Review if workspace scale, remote caching security, build performance, or governance needs exceed Turborepo/pnpm capability.
