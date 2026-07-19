# Testing Standard

## Purpose

Define evidence required to trust future behavior, data, scoring, strategies, and operational controls without implying that tests eliminate risk.

## Binding Principles

Tests are layered, reproducible, risk-proportionate, independent of real funds, and traceable to requirements. Failures are investigated rather than hidden. Research and trading validation must model uncertainty and bias.

## Mandatory Rules

- **Unit tests:** Cover domain invariants, calculations, boundary cases, and failure paths in isolation.
- **Integration tests:** Verify owned components with persistence, messaging, providers through controlled adapters, and infrastructure boundaries.
- **Contract tests:** Protect API, event, adapter, schema, compatibility, units, and error semantics.
- **End-to-end tests:** Exercise critical user and operational flows in isolated non-production contexts.
- **Security tests:** Include authorization, input abuse, secret leakage, dependency, wallet isolation, transaction policy, and emergency-stop scenarios.
- **Load and performance tests:** Validate measured targets, backpressure, degradation, recovery, and cost assumptions before scale claims.
- **Backtesting validation:** Prevent look-ahead and survivorship bias, version datasets and logic, model fees/slippage/latency/liquidity, and run sensitivity checks.
- **Paper-trading validation:** Verify lifecycle, fills, positions, limits, reconciliation, stale data, restarts, faults, and incident drills over a documented period.
- **Determinism and reproducibility:** Control time, randomness, configuration, data versions, and dependencies where practical; record seeds and versions.
- **Test data:** Use synthetic, licensed, anonymized, and redacted data; never use secrets, private keys, or uncontrolled production mutation.

## Prohibited Practices

Do not call live trading from tests, mask flaky tests indefinitely, claim unrun tests passed, rely solely on happy paths or one provider, tune against test labels, share mutable environments without isolation, or treat simulated profitability as guaranteed performance.

## Future Detail

Frameworks, coverage and mutation thresholds, environments, fixture formats, performance targets, security tools, historical datasets, paper duration, promotion gates, and CI parallelism await technology and product ADRs.
