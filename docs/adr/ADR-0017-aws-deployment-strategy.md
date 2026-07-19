# ADR-0017: AWS Deployment Strategy

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [AWS Deployment Architecture](../AWS_DEPLOYMENT_ARCHITECTURE.md), [Deployment Standard](../DEPLOYMENT_STANDARD.md)

## Context

An existing AWS server can reduce staging cost but hosts Astro Sling. Production requires stronger isolation, managed data, rollback, backups, telemetry, and independent scaling.

## Decision Drivers

Security isolation, operational simplicity, existing capacity, cost control, long-running API/WebSocket/workers, AWS fit, recovery, and scaling.

## Considered Options

Single EC2 with Compose, ECS Fargate, EKS, Lambda, and hybrid.

## Decision

Permit isolated Docker Compose on the existing host for staging only, with separate user/process/directory/network/ports/volumes/secrets and resource limits from Astro Sling. Target ECS Fargate for production compute, RDS PostgreSQL, managed Redis after compatibility validation, S3, Secrets Manager, private networking, managed TLS/ingress, backups, and OTel-compatible telemetry. Do not assume the existing host is production-suitable.

## Consequences

### Positive

Low-cost staging path and a managed, scalable production direction.

### Negative

Two deployment models and AWS-specific production operations.

### Risks

Shared-host compromise/contention, cost growth, migration complexity, managed-service incompatibility, or incomplete disaster recovery.

## Rejected Alternatives

EC2-only production lacks assumed resilience/isolation; EKS is excessive; Lambda is poor for long-lived listeners/WebSockets; hybrid is premature.

## Implementation Constraints

Non-root containers, hardened SSH/firewall, reverse proxy/TLS, private data ports, least-privilege IAM, OIDC CI, encrypted backups/restore tests, immutable artifacts, explicit rollback, no production secrets below production, and live trading disabled.

## Validation Criteria

Capacity/security review, Astro Sling isolation test, backup/restore, rollback, telemetry, vulnerability scan, ECS/RDS/Redis compatibility spike, cost estimate, and incident drill before promotion.

## Review Conditions

Review after staging measurements, production SLO/RTO/RPO, traffic/cost, AWS region, or workload evidence; any live deployment requires later safety ADRs.
