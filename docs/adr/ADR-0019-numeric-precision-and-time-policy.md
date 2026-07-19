# ADR-0019: Numeric Precision and Time Policy

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Data Architecture](../DATA_ARCHITECTURE.md), [Coding Standard](../CODING_STANDARD.md), [API Standard](../API_STANDARD.md)

## Context

Token units, prices, fiat values, fees, scores, timestamps, chain observations, and ingestion latency cannot tolerate implicit binary-float rounding or ambiguous time.

## Decision Drivers

Financial correctness, deterministic replay, cross-language contracts, reconciliation, auditability, database fidelity, and testability.

## Considered Options

JavaScript number, untyped decimal strings, and explicit raw integers plus exact decimal values with UTC time.

## Decision

Do not use JavaScript number for token amounts, prices, fiat values, fees, rates, limits, or financial decisions. Store token raw amounts as arbitrary-size integer/decimal-safe representations with explicit token decimals. Store prices/fiat using declared PostgreSQL numeric precision/scale and a selected decimal-safe application library. Centralize/version rounding. Use UTC timestamps, separate chain/source observed time from ingestion/processing/decision time, and use monotonic clocks for durations.

## Consequences

### Positive

Exact, replayable, auditable calculations and unambiguous time semantics.

### Negative

Serialization, mapping, formatting, and arithmetic require explicit types and policies.

### Risks

Accidental coercion to number, overflow, mismatched scale, undocumented rounding, timestamp substitution, or clock skew.

## Rejected Alternatives

JavaScript number cannot exactly represent many values; untyped strings lack enforced scale/unit and arithmetic semantics.

## Implementation Constraints

Branded domain types, boundary schemas, no implicit coercion, explicit unit/scale, round only at documented boundaries, versioned rounding mode, no float comparisons for decisions, ISO/RFC-compatible UTC transport, and multiple time fields.

## Validation Criteria

Property/boundary tests cover maximum raw amounts, tiny/large decimals, serialization/database round-trip, all rounding modes, ordering/comparison, timezone/DST independence, clock skew, and deterministic replay.

## Review Conditions

Review exact decimal library, scales, and timestamp representation during Sprint 0.3/schema design; weakening exactness or UTC separation requires a superseding ADR.
