# ADR-0005: Backend Framework

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Technology Evaluation](../TECHNOLOGY_EVALUATION.md), [API Standard](../API_STANDARD.md)

## Context

The API needs strong validation, serialization, TypeScript support, structured logs, WebSocket integration, test injection, and minimal domain lock-in.

## Decision Drivers

Boundary security, performance, testability, modular composition, operational simplicity, and framework isolation.

## Considered Options

Fastify, NestJS, and Express.

## Decision

Use Fastify as the HTTP/WebSocket composition framework. Route schemas drive runtime validation, response serialization, and OpenAPI generation. Domain/application modules remain framework-independent.

## Consequences

### Positive

Schema-first boundaries, encapsulated plugins, Pino integration, and injection testing.

### Negative

Project module/application conventions must be designed rather than inherited.

### Risks

Untrusted dynamic schemas, leaked validation detail, plugin coupling, or unsafe request-ID acceptance.

## Rejected Alternatives

NestJS adds abstraction/decorator coupling; Express requires more project-owned validation, serialization, and structure.

## Implementation Constraints

Schemas are trusted repository code, external IDs are validated, error responses sanitized, response schemas mandatory for sensitive routes, and Fastify objects stop at adapter boundaries.

## Validation Criteria

Health-only API proves schema validation/serialization, redacted JSON logs, correlation, injection test, graceful shutdown, and no domain dependency on Fastify.

## Review Conditions

Review if framework lifecycle, security support, WebSocket capability, ecosystem, or measured operational needs become inadequate.
