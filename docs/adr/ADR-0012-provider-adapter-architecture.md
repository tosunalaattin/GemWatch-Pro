# ADR-0012: Provider and Chain Adapter Architecture

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [System Boundaries](../SYSTEM_BOUNDARIES.md), [Data Architecture](../DATA_ARCHITECTURE.md), [Event Architecture](../EVENT_ARCHITECTURE.md)

## Context

Market, DEX, security, social, wallet, price-history, RPC, and WebSocket providers vary in schema, quality, freshness, rate limits, cost, and failure. Chain finality/reorg behavior also varies.

## Decision Drivers

Provider independence, corroboration, provenance, testability, failure visibility, chain normalization, cost control, and safe mainnet use.

## Considered Options

Internal adapters, direct SDK use in domain modules, and one aggregation provider/gateway.

## Decision

All external integrations implement internal capability ports. Adapter results include provider identity, request metadata, normalized result, raw reference, freshness/confidence/quality, rate-limit state, classified error/retryability, timeout/circuit health, and provenance. Chain adapters separately abstract RPC, WebSocket listeners, confirmation/reorg policy, deduplication, normalization, retries, fallback, and fixtures. No chain is selected now.

## Consequences

### Positive

Replaceable/testable providers and explicit evidence quality, conflicts, and failure.

### Negative

Every provider needs mapping, fixtures, health, and capability documentation.

### Risks

Lowest-common-denominator contracts, hidden provider semantics, unsafe fallback, or raw payload leakage.

## Rejected Alternatives

Direct SDK coupling violates MEM-003; a single aggregation source violates corroboration and availability goals.

## Implementation Constraints

SDKs stay in adapters; inputs are untrusted/size-bounded; calls have deadlines, retry budgets, rate limits, circuit breakers, redaction, terms/licensing review, and health. Security evidence is corroborated where practical. Mainnet is read-only until later safety phases.

## Validation Criteria

Contract suites and fixtures cover success, partial/stale/conflicting data, schema drift, rate limit, timeout, malformed payload, fallback, reorg, duplicate events, and provider outage.

## Review Conditions

Review contracts when initial chain/provider research exposes semantics not representable without unsafe loss; provider selection requires separate evidence/ADR.
