# ADR-0004: Web Application Stack

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Technology Evaluation](../TECHNOLOGY_EVALUATION.md), [System Boundaries](../SYSTEM_BOUNDARIES.md)

## Context

The planned web panel is authenticated, SPA-heavy, real-time, chart/table intensive, SEO-light, and potentially PWA-capable.

## Decision Drivers

Maintainability, ecosystem, browser testing, static deployment, real-time UI suitability, accessibility, and shared TypeScript.

## Considered Options

React with Vite, Next.js, and Vanilla TypeScript.

## Decision

Use React with Vite for the web SPA. The web consumes authenticated REST/WebSocket contracts only and is deployable as static assets. Router, state/query, UI, chart, and PWA libraries remain Sprint 0.3 or later decisions.

## Consequences

### Positive

Fast development, mature component/visualization ecosystem, and low deployment complexity.

### Negative

Application conventions and auth/data-fetching patterns must be selected explicitly.

### Risks

Bundle growth, unsafe token storage, accessibility regressions, and expensive real-time rendering.

## Rejected Alternatives

Next.js adds unneeded server-rendering/full-stack coupling; Vanilla TypeScript creates excessive custom UI infrastructure.

## Implementation Constraints

No database/provider access, no secrets, no long-lived token in local storage, validated server contracts, accessible components, bundle budgets, and Playwright coverage.

## Validation Criteria

Sprint 0.3 builds a health-only SPA on Windows/CI, validates static output and browser test, and demonstrates API-boundary isolation without domain screens.

## Review Conditions

Review if public SEO/SSR, server components, offline/PWA, browser support, or rendering-performance requirements materially change.
