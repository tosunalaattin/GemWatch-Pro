# ADR-0002: Modular Monolith First

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Technology Evaluation](../TECHNOLOGY_EVALUATION.md), [System Boundaries](../SYSTEM_BOUNDARIES.md), [Architecture](../ARCHITECTURE.md)

## Context

One developer must build a professional real-time platform with many future bounded contexts. Day-one microservices would multiply deployments, distributed failure modes, contracts, and cost before load or ownership evidence exists.

## Decision Drivers

Security, explicit safety boundaries, maintainability, deterministic testing, operational simplicity, low initial cost, and future extraction.

## Considered Options

Modular monolith, microservices from day one, and an unstructured monolith.

## Decision

Begin with one modular backend artifact and explicit bounded-context modules. API and worker processes may run separately from the same codebase/artifact. Cross-context access uses public application contracts or versioned events. Extract services only from measured scaling, security, deployment, runtime, or ownership needs.

## Consequences

### Positive

One primary deployment/data transaction boundary, simple local operation, fast refactoring, and comprehensive tests.

### Negative

Code boundaries rely on dependency enforcement rather than network isolation.

### Risks

The monolith may become tightly coupled or internal calls may bypass critical policies.

## Rejected Alternatives

Microservices are premature; an unstructured monolith cannot protect provider, risk, paper/live, and audit boundaries.

## Implementation Constraints

Domain modules cannot import frameworks/providers. Web cannot access storage. Trade Execution accepts only Risk Manager authorization. Paper and live boundaries remain distinct. Architecture tests enforce imports.

## Validation Criteria

Sprint 0.3 demonstrates isolated packages/modules, one API composition root, separately runnable worker shell, dependency tests, and one-command local operation without domain features.

## Review Conditions

Review when a context needs independent scaling/runtime/security/release ownership, or monolith deployments violate measured availability or cost objectives.
