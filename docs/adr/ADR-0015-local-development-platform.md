# ADR-0015: Local Development Platform

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [Development Platform](../DEVELOPMENT_PLATFORM.md), [Deployment Standard](../DEPLOYMENT_STANDARD.md)

## Context

The primary developer uses Windows and needs simple startup with Linux/AWS parity without maintaining PostgreSQL/Redis manually.

## Decision Drivers

Windows compatibility, one-command target, reproducibility, debugging speed, isolation, test parity, and low operational burden.

## Considered Options

All-native services, Docker Compose, dev containers, and a mixed native/Compose approach.

## Decision

Run Node/pnpm application processes natively by default and PostgreSQL/Redis through Docker Compose. Support Docker Desktop with WSL2 and optional full WSL2 use. Dev containers remain optional. Target one bootstrap command and one development command after prerequisites.

## Consequences

### Positive

Fast local debugging plus reproducible stateful services.

### Negative

Requires Docker Desktop resources and cross-platform path/watcher care.

### Risks

OneDrive/WSL filesystem issues, port collisions, stale volumes, local secrets, or accidental staging/production connections.

## Rejected Alternatives

All-native services reduce parity; mandatory dev containers add initial complexity.

## Implementation Constraints

Local-only ports, non-production credentials, isolated networks/volumes, health checks, explicit destructive reset, cross-platform root tasks, safe .env.example files, and no live wallet capability.

## Validation Criteria

Fresh Windows bootstrap, optional WSL2 path, repeat startup/cleanup, health checks, integration tests, no external secret, and documented recovery from port/volume failures.

## Review Conditions

Review if team onboarding, Windows performance, licensing, container security, or remote-development needs justify mandatory dev containers or another runtime.
