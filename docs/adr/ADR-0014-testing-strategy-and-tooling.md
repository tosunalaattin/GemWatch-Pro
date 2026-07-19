# ADR-0014: Testing Strategy and Tooling

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Testing Standard](../TESTING_STANDARD.md), [Development Platform](../DEVELOPMENT_PLATFORM.md)

## Context

The platform requires deterministic domain tests, real database/cache/queue validation, API contracts, provider fixtures, browser coverage, security/load tests, and future backtest/paper replay evidence.

## Decision Drivers

TypeScript/Vite alignment, isolation, real dependency behavior, reproducibility, browser coverage, failure testing, and CI support.

## Considered Options

Vitest-centered suite, Jest-centered suite, and Node test runner with separate scripts.

## Decision

Use Vitest for unit/component/integration coordination, Fastify injection for API tests, Testcontainers for PostgreSQL/Redis integration, and Playwright for browser/end-to-end. Use OpenAPI/event/adapter contract tests, deterministic clocks/IDs/seeds, provider fixtures, and add fast-check, k6, DAST/static/security tools only where validated.

## Consequences

### Positive

One TypeScript-friendly suite with real infrastructure and browser evidence.

### Negative

Containers/browsers increase setup time and CI resources.

### Risks

Flakiness, test-data leakage, false parity, unmodeled mainnet behavior, or simulated profitability overclaim.

## Rejected Alternatives

Jest is viable but less aligned with Vite/ESM; Node core test alone does not cover all required layers coherently.

## Implementation Constraints

No live transactions or production mutation, synthetic/licensed/redacted data, hermetic clocks/randomness, explicit retries/timeouts, no hidden flaky-test suppression, and separate unit/integration/e2e/security/load/backtest/paper evidence.

## Validation Criteria

Sprint 0.3 runs unit, Testcontainers smoke, API contract/health, and Playwright health-page tests on Windows and CI with repeatable outcomes.

## Review Conditions

Review tools when performance, flakiness, ecosystem support, browser coverage, or future language services require specialized frameworks.
