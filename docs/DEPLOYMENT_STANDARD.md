# Deployment Standard

## Purpose

Define safe, repeatable promotion and recovery expectations across future environments.

## Binding Principles

Build once where practical, promote with evidence, separate configuration and credentials, minimize privilege, observe every change, and preserve rollback or recovery. No deployment may silently expand financial authority.

## Mandatory Rules

- **Local:** Provide reproducible setup using non-secret examples and safe mock or sandbox dependencies.
- **Local platform:** Run Node/pnpm applications natively with Docker Compose PostgreSQL/Redis infrastructure; Windows and optional WSL2 are supported.
- **CI:** Run formatting, linting, tests, secret and dependency checks, artifact integrity, and policy gates appropriate to scope.
- **Development:** Use isolated non-production identities and data with no production wallet authority.
- **Staging:** Mirror relevant production controls sufficiently to validate migration, rollback, observability, and incident procedures without real funds by default.
- **Staging isolation:** On the existing AWS host, isolate GemWatch from Astro Sling using dedicated non-root user, directory, network, ports, volumes, secrets, resource limits, proxy/TLS, firewall, monitoring, backup, SSH hardening, and rollback.
- **Production:** Require reviewed, authorized, traceable releases, separation of duties, approved windows or risk policy, health checks, and post-deploy verification.
- **Production direction:** ECS Fargate with private task networking, RDS PostgreSQL, managed Redis after compatibility tests, S3, Secrets Manager, managed TLS/ingress, encrypted backups, and OTel-compatible telemetry; the shared host is not assumed sufficient.
- **Migration:** Version, review, test, back up, and rehearse compatible data and configuration transitions.
- **Rollback:** Define triggers, ownership, tested procedures, data reconciliation, and safe forward-fix limits.
- **Backup:** Encrypt, restrict, monitor, retain, and regularly restore-test required state.
- **Observability:** Establish health, metrics, logs, traces, data quality, audit correlation, alert ownership, and redaction before promotion.
- **Configuration separation:** Isolate local, CI, development, staging, and production values and secrets; missing live settings must fail closed.
- **Review:** Direct unreviewed production deployment is prohibited.

## Prohibited Practices

Do not deploy from an unreviewed workstation state, reuse production secrets in lower environments, bake secrets into artifacts, enable live trading by default, bypass CI or Risk Manager gates, perform destructive migrations without recovery, or claim success without health and reconciliation checks.

## Accepted Technology Direction

OCI-compatible artifacts move from Compose staging to ECS roles. GitHub Actions later uses OIDC and protected environments. Build once/promote the same artifact. Production migrations are explicit jobs, never startup side effects. Live trading remains disabled.

## Future Detail

Infrastructure-as-code tool, AWS region/account/VPC layout, image build/signing, release strategy, sizes/autoscaling, SLOs, retention, RPO/RTO, DNS/domain, approval roles, and disaster-recovery design require later evidence.
