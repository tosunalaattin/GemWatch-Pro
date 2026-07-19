# Coding Standard

## Purpose

Define technology-independent expectations for future source code so it remains understandable, secure, testable, and traceable to documented design.

## Binding Principles

Clarity and correctness take priority over cleverness. Domain rules remain separate from provider, framework, transport, and storage concerns. Failures and uncertainty are explicit. Financially consequential behavior is deny-by-default and auditable.

## Mandatory Rules

- Use cohesive modules, precise names, small interfaces, and a single clear responsibility.
- Validate untrusted inputs at boundaries and preserve typed or otherwise explicit domain invariants.
- Use provider adapters and versioned contracts; isolate side effects and time, randomness, and network dependencies for tests.
- Handle errors intentionally with context and correlation while redacting sensitive data.
- Prefer immutable data and deterministic logic where practical; document concurrency, retry, idempotency, and ordering assumptions.
- Add proportionate tests and update documentation before considering behavior complete.
- Use repository-approved formatters, linters, analyzers, and dependency policies once selected through ADRs.

## Prohibited Practices

Do not hard-code secrets, disable safety checks, bypass the Risk Manager, allow AI to authorize trades, couple business logic to provider schemas, swallow errors, log sensitive material, use unexplained constants, introduce unreviewed dependencies, or claim unsupported performance or financial outcomes.

## Future Detail

Language versions, formatters, naming conventions, complexity limits, dependency injection patterns, concurrency rules, package layout, generated-code policy, and static-analysis thresholds will follow explicit technology ADRs.
