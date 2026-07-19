# Testing Standard

## Purpose

Define evidence required to trust future behavior, data, scoring, strategies, and operational controls without implying that tests eliminate risk.

## Binding Principles

Tests are layered, reproducible, risk-proportionate, independent of real funds, and traceable to requirements. Failures are investigated rather than hidden. Research and trading validation must model uncertainty and bias.

## Mandatory Rules

- Use Vitest as the default TypeScript test framework, Fastify injection for API tests, Testcontainers for PostgreSQL/Redis, and Playwright for browser/end-to-end tests.
- **Unit tests:** Cover domain invariants, calculations, boundary cases, and failure paths in isolation.
- **Integration tests:** Verify owned components with persistence, messaging, providers through controlled adapters, and infrastructure boundaries.
- **Contract tests:** Protect API, event, adapter, schema, compatibility, units, and error semantics.
- **End-to-end tests:** Exercise critical user and operational flows in isolated non-production contexts.
- **Security tests:** Include authorization, input abuse, secret leakage, dependency, wallet isolation, transaction policy, and emergency-stop scenarios.
- **Load and performance tests:** Validate measured targets, backpressure, degradation, recovery, and cost assumptions before scale claims.
- **Backtesting validation:** Prevent look-ahead and survivorship bias, version datasets and logic, model fees/slippage/latency/liquidity, and run sensitivity checks.
- **Paper-trading validation:** Verify lifecycle, fills, positions, limits, reconciliation, stale data, restarts, faults, and incident drills over a documented period.
- **Determinism and reproducibility:** Control time, randomness, configuration, data versions, and dependencies where practical; record seeds and versions.
- **Event and queue tests:** Validate outbox atomicity, at-least-once duplicates, idempotency, crash/ack boundaries, retries, poison quarantine, ordering partitions, and safe replay.
- **Numeric/time tests:** Cover extreme/tiny exact values, precision/scale, rounding policies, database/contract round trips, UTC/timezone independence, source versus ingestion time, and monotonic durations.
- **Test data:** Use synthetic, licensed, anonymized, and redacted data; never use secrets, private keys, or uncontrolled production mutation.

## Prohibited Practices

Do not call live trading from tests, mask flaky tests indefinitely, claim unrun tests passed, rely solely on happy paths or one provider, tune against test labels, share mutable environments without isolation, or treat simulated profitability as guaranteed performance.

## Accepted Technology Direction

Provider/chain adapters use versioned fixtures and contract suites. Deterministic clocks/IDs/randomness are injected. Optional fast-check, k6, DAST/static scanners, and specialized backtest/replay tools require evaluation before adoption.

## Future Detail

Coverage/mutation thresholds, fixture formats, browser matrix, load/security tools, performance targets, historical datasets, paper duration, promotion gates, and CI parallelism remain to be measured.

## Implemented Platform Rules

Vitest covers configuration, health schemas, UTC/correlation primitives, redaction/logger metadata, disabled telemetry, Fastify injection/readiness failures/safe errors, web health states, and worker lifecycle/no-job behavior. When explicitly enabled, Testcontainers creates disposable PostgreSQL/Redis instances on random host ports, verifies queries/PING/error timeout/production guards, closes clients, and cleans resources without skips. Playwright uses built API/web artifacts and explicit health URLs for a Chromium status smoke test; its child processes must be absent after completion. Docker-dependent tests skip visibly only when the explicit integration flag is absent.
