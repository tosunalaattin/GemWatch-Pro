# AWS Deployment Architecture

## Decision Summary

Local development uses native Node processes plus Compose infrastructure. Development remains non-production and may initially run locally/CI. Staging may use the existing AWS server with strictly isolated Docker Compose. Production direction is ECS Fargate with managed PostgreSQL, managed Redis compatible with the accepted client/queue, S3, Secrets Manager, private networking, managed TLS, and OTel-compatible telemetry export. The current single server is not assumed production-ready.

No AWS resource is created and no server is accessed in Sprint 0.2.

## Local

- Native API/web/worker processes with local-only Compose PostgreSQL and Redis.
- Synthetic fixtures, non-secret examples, and no production credentials or networks.
- TLS may be omitted on loopback only; security-relevant cookie/TLS behavior needs dedicated tests.
- Local volumes are disposable and never considered backups.
- Live trading and real wallet integration are absent.

## Development

- CI and developer-controlled non-production environment for integration and preview work.
- Separate identities, data, secrets, buckets, databases, queues, and Cognito resources from staging/production.
- No route to production wallet or live-execution capability.
- Ephemeral review environments are optional and must have TTL, budgets, and no long-lived secrets.
- Development can remain local until a shared environment has a demonstrated need.

## Staging on the Existing AWS Host

The staging host may be shared with Astro Sling only after capacity, ownership, backup, and incident risks are reviewed. Required isolation:

- **Process/container:** Dedicated non-root Unix user and group; containers run as non-root with read-only filesystem/capability reduction where possible; no host PID/privileged mode or Docker socket mount.
- **Directory:** A separate absolute deployment directory owned by the GemWatch user; no shared configuration, source, logs, or writable paths with Astro Sling.
- **Network:** Separate Docker network, no default cross-network attachment, private database/Redis ports, and explicit egress policy where practical.
- **Ports:** Only the reverse proxy publishes the approved HTTP(S) ingress; API/data ports bind privately or loopback and cannot collide with Astro Sling.
- **Volumes:** Named, uniquely prefixed volumes with separate ownership, backup, retention, and restore procedures.
- **Secrets:** Stored outside Git and Compose files with minimum permissions; use Secrets Manager or an approved host delivery mechanism, never shared Astro Sling environment files.
- **Reverse proxy:** Separate virtual host/upstream, request/body/time limits, WebSocket support, security headers, access-log redaction, and health-aware routing.
- **TLS:** Managed/automated certificate renewal, modern TLS policy, HTTP-to-HTTPS redirect, and renewal monitoring.
- **Firewall:** Default-deny inbound; allow only SSH from approved sources and public TLS ingress as required. PostgreSQL/Redis are never public.
- **Resource limits:** CPU, memory, process, file descriptor, log rotation, and disk quotas/alarms protect both GemWatch and Astro Sling.
- **Monitoring:** Host/container health, disk, memory, CPU, restarts, TLS, backups, provider/queue/data freshness, and deployment markers.
- **Permissions:** Least-privilege deployment user; no root application process; restricted sudo and Docker access.
- **SSH hardening:** Key-based access, disabled password/root login where operationally safe, patched host, rate controls, audit, and emergency access procedure.
- **Rollback:** Immutable/versioned image or artifact, prior Compose/config reference, migration compatibility check, backup, explicit rollback command/runbook, and post-rollback reconciliation.

Staging remains paper/live-disabled. A compromise or resource-exhaustion incident in Astro Sling is treated as a possible staging-host compromise and vice versa. Stronger isolation or a separate host is required if risks cannot be bounded.

## Production Direction

### Compute

- ECS Fargate services/tasks for API/WebSocket, worker groups, and controlled scheduled jobs.
- Separate task roles, security groups, desired counts, resource limits, deployments, and scaling policies by runtime role.
- Immutable images in ECR with vulnerability scanning/signing/provenance direction.
- No shell-based host administration as a normal deployment mechanism.

### Network

- Dedicated production VPC or explicitly approved isolated VPC boundary.
- Public subnets only for approved load-balancing/NAT components; application and data services in private subnets.
- Application Load Balancer or approved ingress terminates ACM-managed TLS and supports WebSocket health/routing.
- Security groups allow only required flows; database/Redis have no public ingress.
- VPC flow logs and least-privilege egress/endpoints are evaluated.

### Database

- Amazon RDS for PostgreSQL with encryption at rest, TLS, automated backups, point-in-time recovery, monitoring, maintenance policy, and Multi-AZ/read scaling based on production requirements.
- Application, migration, backup, and read roles are separate.
- Production migrations run as an explicit reviewed deployment stage, never application startup.

### Redis

- Managed Redis-compatible service after confirming BullMQ/client command and persistence compatibility.
- Private subnet/security group, TLS/auth where supported, encryption, maintenance, monitoring, memory/eviction policy, backups only where queue recovery requires them, and no financial source-of-truth data.

### Object Storage

- S3 buckets separated by environment and data class with block-public-access, encryption, least-privilege IAM, lifecycle, versioning where justified, integrity metadata, and access logging.
- Raw provider/chain objects respect retention, licensing, redaction, and cost controls.

### Secrets

- AWS Secrets Manager with KMS, least-privilege task-role access, rotation where supported, private network paths where justified, monitoring, and no secret values in task definitions, images, logs, or Git.
- GitHub Actions uses AWS OIDC and short-lived roles rather than stored long-lived AWS keys.

### Logs and Metrics

- Structured stdout logs and OTel traces/metrics route through approved collectors/exporters to CloudWatch-compatible storage or another reviewed backend.
- Retention, sampling, cardinality, redaction, alarms, dashboards, and cost budgets are environment-specific.
- Audit storage/access is separate from ordinary telemetry and cannot rely only on container logs.

### Authentication

- Dedicated production Cognito user pool/app client/domain configuration using authorization code with PKCE, MFA readiness/enforcement policy, recovery controls, and restricted callback/logout URLs.
- Application capability checks remain authoritative for admin, paper, wallet, and future live operations.

## Environment Separation

AWS accounts are preferred for production isolation when feasible; otherwise use explicit VPC, IAM, KMS, secrets, database, cache, bucket, Cognito, logging, and budget boundaries. Names/tags include project, environment, owner, data class, and cost center. No staging principal can assume production roles by default. Production secrets and data never flow to lower environments.

## CI/CD Direction

GitHub Actions builds once, tests/scans, produces provenance-addressed artifacts/images, and promotes the same artifact. Deployment uses OIDC short-lived AWS credentials, protected environments, required reviewers for production, least-privilege roles, deployment concurrency, and recorded release metadata. Direct unreviewed production deployment is prohibited.

## Rollback and Migration

- Application rollback uses a known previous immutable artifact when schema compatibility allows.
- Database changes follow expand-and-contract, backup, rehearsal, and explicit rollback/forward-fix plans.
- Queue/event contracts remain backward compatible through the supported replay window.
- Rollback never silently discards outbox, audit, paper, or future execution state; reconciliation is mandatory.
- DNS/ingress changes use staged health checks and documented reversal.

## Backup and Restore

Define backup class, owner, encryption, retention, failure domain, restore procedure, and test cadence for PostgreSQL, required Redis queue state, S3 objects, configuration/audit exports, and deployment metadata. A backup is not accepted until a restore test proves usability. RPO/RTO and cross-region disaster recovery remain deferred until business requirements are approved.

## Disaster Recovery

The initial staging goal is recoverability, not high availability. Production design must define regional failure assumptions, dependency/provider fallback, data restore order, queue/outbox reconciliation, DNS/ingress recovery, identity availability, secret rotation, incident authority, and paper/live safety state. During uncertainty, execution remains disabled and risk gates fail closed.

## Cost Controls

Use budgets and anomaly alarms, cost-allocation tags, log/trace/raw-data lifecycle, right-sized task/database/cache resources, autoscaling bounds, provider/RPC quotas, and scheduled non-production shutdown where safe. Pricing and sizes are externally verified immediately before provisioning.

## Promotion Gates

Production requires measured staging reliability, threat model, independent security review proportionate to risk, backup/restore evidence, load/capacity results, incident and emergency-stop drills, migration/rollback rehearsal, monitoring/SLO ownership, cost approval, and explicit confirmation that live trading remains disabled unless a later authorized phase enables it.

## Migration Path

1. Sprint 0.3 creates local platform and health-only applications.
2. Later foundation work produces OCI containers and infrastructure definitions.
3. Isolated staging Compose validates operations without real funds.
4. Managed RDS/Redis/S3/Secrets boundaries are introduced and restored/tested.
5. API and worker images move to ECS Fargate using the same contracts.
6. Production readiness is reviewed; EKS, Lambda, SQS, multi-region, or specialized stores require measured need and ADRs.
