# API Standard

## Purpose

Define stable, secure, provider-neutral expectations for future synchronous and asynchronous interfaces.

## Binding Principles

APIs are trust boundaries. Contracts must be explicit, versionable, observable, backward-aware, and independent of internal storage or provider formats. Defaults must be safe and errors actionable without leaking secrets.

## Mandatory Rules

- Use REST/OpenAPI for external resource, command, query, search/filter, dashboard, and configuration APIs; use authenticated WebSocket for bidirectional real-time updates and allow SSE for justified one-way feeds.
- Implement the initial boundary in Fastify with repository-owned runtime schemas and sanitized response/error schemas.
- Document ownership, consumers, schema, semantics, units, precision, chain/network identity, timestamps, provenance, freshness, and compatibility policy.
- Authenticate and authorize by capability; validate size, shape, ranges, identifiers, and state transitions.
- Use correlation and idempotency identifiers where retries or mutations are possible.
- Define pagination, filtering, rate behavior, timeouts, retries, error categories, and deprecation policy.
- Version contracts and test provider adapters and consumers against them.
- Separate read, configuration, paper, and future live-execution privileges.
- Audit sensitive mutations and redact credentials, wallet details, and personal data.
- Authorize every REST operation and WebSocket connection/subscription/message through application capabilities; Cognito identity claims do not grant trade authority.
- Use exact decimal/integer-safe serialized values and ISO-compatible UTC timestamps with explicit semantics; never expose ambiguous financial JSON numbers.

## Prohibited Practices

Do not expose raw provider contracts as domain APIs, encode secrets in URLs, return internal stack traces, silently change semantics, use ambiguous floats or timestamps for financial data, permit unauthenticated control actions, or provide a route around the Risk Manager.

## Accepted Technology Direction

GraphQL is not an initial interface. Internal modular-monolith calls use application ports or versioned events, not loopback HTTP. OpenAPI/event schemas live in shared contracts without Fastify/provider types.

## Future Detail

Schema library, URL/version convention, error envelope, pagination/cursor format, WebSocket protocol/resume, rate limits, generated clients, and numeric SLOs are finalized with implemented contracts.

## Implemented Platform Rules

Fastify exposes only `/health`, `/health/live`, and `/health/ready` with JSON Schema/OpenAPI and shared runtime validation. Requests receive correlation IDs, a one-MiB body limit, bounded timeouts, exact CORS allowlisting, Helmet headers, a baseline rate limit, redacted logging, and safe errors. Swagger UI is disabled in production. No product, identity, WebSocket, or command endpoint exists.
