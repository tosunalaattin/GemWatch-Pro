# ADR-0003: Primary Language and Runtime

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Technology Evaluation](../TECHNOLOGY_EVALUATION.md), [Development Platform](../DEVELOPMENT_PLATFORM.md)

## Context

The platform needs real-time I/O, REST/WebSocket clients, web3 SDK access, workers, shared web/backend contracts, and maintainable Codex-assisted development. CPU-heavy analysis may later be isolated.

## Decision Drivers

Ecosystem maturity, shared contracts, async I/O, testability, supply-chain support, Windows/AWS operation, and future polyglot extraction.

## Considered Options

TypeScript with Node.js, Python, and Go.

## Decision

Use TypeScript as the primary language on a currently supported Node.js LTS line. Sprint 0.3 pins the exact supported major and package versions. Python or Go may be introduced only behind versioned ports/events when a measured workload justifies a second runtime.

## Consequences

### Positive

One language across web/backend/contracts, strong SDK ecosystem, and productive tooling.

### Negative

Runtime schemas are still required; CPU work can block the event loop.

### Risks

Large dependency graphs, unsafe numeric defaults, and accidental CPU-heavy API work.

## Rejected Alternatives

Python is retained for future analytics but adds a second toolchain; Go is retained for high-throughput workers but loses shared frontend language and some initial web3 breadth.

## Implementation Constraints

Use strict TypeScript, supported LTS only, runtime input validation, exact numeric types, bounded dependencies, worker processes/threads for CPU work, and no Node/framework imports in pure domain logic where avoidable.

## Validation Criteria

Clean Windows and CI bootstrap, typecheck/build/test, WebSocket/worker smoke paths, dependency scanning, and explicit event-loop blocking tests/guidance.

## Review Conditions

Review when SDK coverage, security support, latency, memory, CPU, or analytical ecosystem measurements show a bounded context is better served by Go or Python.
