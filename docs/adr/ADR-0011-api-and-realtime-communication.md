# ADR-0011: API and Real-Time Communication

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [API Standard](../API_STANDARD.md), [Event Architecture](../EVENT_ARCHITECTURE.md)

## Context

Configuration, search, dashboards, health, and real-time token/alert updates require explicit external contracts. Internal modules need transport-neutral boundaries.

## Decision Drivers

Security, compatibility, tooling, filtering, real-time behavior, observability, and operational simplicity.

## Considered Options

REST, GraphQL, WebSocket, and Server-Sent Events; combinations were evaluated because they are not mutually exclusive.

## Decision

Use REST with OpenAPI for CRUD, configuration, search/filter, dashboard queries, health, and external command/query contracts. Use authenticated WebSocket for bidirectional real-time updates. SSE is permitted for one-way streams. Internal modules use application ports and versioned events, not HTTP by default. Metrics use a protected scrape/export boundary.

## Consequences

### Positive

Mature explicit contracts with fit-for-purpose real-time communication.

### Negative

REST and WebSocket require separate lifecycle, authorization, versioning, and scaling controls.

### Risks

Subscription authorization gaps, connection leaks, unbounded filters, stale clients, or transport contracts leaking into domain logic.

## Rejected Alternatives

GraphQL adds query-cost and authorization complexity without proven need; SSE alone cannot cover expected bidirectional interactions.

## Implementation Constraints

Runtime validation, response schemas, pagination/limits, idempotency, OpenAPI compatibility, per-message/subscription authorization, heartbeat/backpressure, Redis fan-out only when needed, minimal public health, and no web-to-database access.

## Validation Criteria

Contract tests, authorization matrix, malformed/oversized input, reconnect/resume, slow consumer, fan-out, graceful shutdown, version compatibility, and health/metrics access tests.

## Review Conditions

Review if dashboard query complexity justifies GraphQL, one-way streams dominate, or measured WebSocket operations require a dedicated gateway.
