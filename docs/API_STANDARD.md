# API Standard

## Purpose

Define stable, secure, provider-neutral expectations for future synchronous and asynchronous interfaces.

## Binding Principles

APIs are trust boundaries. Contracts must be explicit, versionable, observable, backward-aware, and independent of internal storage or provider formats. Defaults must be safe and errors actionable without leaking secrets.

## Mandatory Rules

- Document ownership, consumers, schema, semantics, units, precision, chain/network identity, timestamps, provenance, freshness, and compatibility policy.
- Authenticate and authorize by capability; validate size, shape, ranges, identifiers, and state transitions.
- Use correlation and idempotency identifiers where retries or mutations are possible.
- Define pagination, filtering, rate behavior, timeouts, retries, error categories, and deprecation policy.
- Version contracts and test provider adapters and consumers against them.
- Separate read, configuration, paper, and future live-execution privileges.
- Audit sensitive mutations and redact credentials, wallet details, and personal data.

## Prohibited Practices

Do not expose raw provider contracts as domain APIs, encode secrets in URLs, return internal stack traces, silently change semantics, use ambiguous floats or timestamps for financial data, permit unauthenticated control actions, or provide a route around the Risk Manager.

## Future Detail

Transport, schema language, serialization, naming, version placement, status mapping, pagination format, rate limits, service-level objectives, and generated clients remain undecided pending ADRs.
