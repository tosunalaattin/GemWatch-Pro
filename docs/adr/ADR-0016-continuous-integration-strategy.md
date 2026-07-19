# ADR-0016: Continuous Integration Strategy

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Development Platform](../DEVELOPMENT_PLATFORM.md), [Git Workflow](../GIT_WORKFLOW.md)

## Context

Every change needs repeatable quality/security evidence integrated with the GitHub source of truth, without operating CI servers.

## Decision Drivers

Repository integration, security, managed operations, branch protection, caching, matrix support, cost, and AWS short-lived identity.

## Considered Options

GitHub Actions, self-hosted CI, and another SaaS CI.

## Decision

Use GitHub Actions on managed runners. Required gates cover formatting, lint, typecheck, unit/integration tests, build, dependency and secret scanning, license checks, migration/documentation validation, and container scanning when applicable. Protect main and use AWS OIDC/protected environments for future deployments.

## Consequences

### Positive

Repository-native PR feedback with no CI host maintenance.

### Negative

Runner limits, cache cost, and third-party action risk.

### Risks

Overprivileged tokens, mutable actions, secret exposure, poisoned caches/artifacts, or bypassed required checks.

## Rejected Alternatives

Self-hosted runners add patching/lateral-movement risk; another SaaS adds a control plane without current value.

## Implementation Constraints

Default read-only permissions, pin actions to reviewed commits, frozen lockfile, untrusted-fork isolation, no long-lived AWS keys, environment approvals, artifact provenance, concurrency, and required checks.

## Validation Criteria

Sprint 0.3 workflow passes/fails each gate intentionally, uses minimum permissions, restores safe caches, runs integration services, and blocks a known secret/dependency/documentation failure.

## Review Conditions

Review when hosted-runner performance, cost, platform limits, or regulated isolation requires approved ephemeral self-hosted runners or another service.
