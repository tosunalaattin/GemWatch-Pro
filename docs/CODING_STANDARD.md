# Coding Standard

## Purpose

Define technology-independent expectations for future source code so it remains understandable, secure, testable, and traceable to documented design.

## Binding Principles

Clarity and correctness take priority over cleverness. Domain rules remain separate from provider, framework, transport, and storage concerns. Failures and uncertainty are explicit. Financially consequential behavior is deny-by-default and auditable.

## Mandatory Rules

- Use strict TypeScript for initial application code on a repository-pinned supported Node.js LTS line.
- Use cohesive modules, precise names, small interfaces, and a single clear responsibility.
- Validate untrusted inputs at boundaries and preserve typed or otherwise explicit domain invariants.
- Use provider adapters and versioned contracts; isolate side effects and time, randomness, and network dependencies for tests.
- Handle errors intentionally with context and correlation while redacting sensitive data.
- Prefer immutable data and deterministic logic where practical; document concurrency, retry, idempotency, and ordering assumptions.
- Add proportionate tests and update documentation before considering behavior complete.
- Use Prettier, ESLint with TypeScript-aware/module-boundary rules, strict type checking, and the repository quality scripts selected in Sprint 0.3.
- Represent token raw amounts with arbitrary-size integers/decimal-safe types and financial values with exact decimals; JavaScript number and float comparison cannot control financial decisions.
- Use UTC durable timestamps, distinct observed/ingested/processed/decision times, and injected monotonic clocks for durations/tests.

## Prohibited Practices

Do not hard-code secrets, disable safety checks, bypass the Risk Manager, allow AI to authorize trades, couple business logic to provider schemas, swallow errors, log sensitive material, use unexplained constants, introduce unreviewed dependencies, or claim unsupported performance or financial outcomes.

## Accepted Technology Direction

Domain packages remain independent of Fastify, React, Drizzle, Redis, BullMQ, Cognito, AWS, chain SDKs, and provider SDKs. API/workers compose those adapters. CPU-bound work leaves the API event loop. Exact runtime/tool versions are pinned in Sprint 0.3.

## Future Detail

Naming, complexity thresholds, dependency-injection style, concurrency/worker-thread rules, generated-code policy, formatter/linter rule sets, and decimal library remain Sprint 0.3 or later refinements.
