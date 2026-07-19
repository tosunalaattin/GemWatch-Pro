# Deployment Standard

## Purpose

Define safe, repeatable promotion and recovery expectations across future environments.

## Binding Principles

Build once where practical, promote with evidence, separate configuration and credentials, minimize privilege, observe every change, and preserve rollback or recovery. No deployment may silently expand financial authority.

## Mandatory Rules

- **Local:** Provide reproducible setup using non-secret examples and safe mock or sandbox dependencies.
- **CI:** Run formatting, linting, tests, secret and dependency checks, artifact integrity, and policy gates appropriate to scope.
- **Development:** Use isolated non-production identities and data with no production wallet authority.
- **Staging:** Mirror relevant production controls sufficiently to validate migration, rollback, observability, and incident procedures without real funds by default.
- **Production:** Require reviewed, authorized, traceable releases, separation of duties, approved windows or risk policy, health checks, and post-deploy verification.
- **Migration:** Version, review, test, back up, and rehearse compatible data and configuration transitions.
- **Rollback:** Define triggers, ownership, tested procedures, data reconciliation, and safe forward-fix limits.
- **Backup:** Encrypt, restrict, monitor, retain, and regularly restore-test required state.
- **Observability:** Establish health, metrics, logs, traces, data quality, audit correlation, alert ownership, and redaction before promotion.
- **Configuration separation:** Isolate local, CI, development, staging, and production values and secrets; missing live settings must fail closed.
- **Review:** Direct unreviewed production deployment is prohibited.

## Prohibited Practices

Do not deploy from an unreviewed workstation state, reuse production secrets in lower environments, bake secrets into artifacts, enable live trading by default, bypass CI or Risk Manager gates, perform destructive migrations without recovery, or claim success without health and reconciliation checks.

## Future Detail

Hosting platform, packaging, infrastructure-as-code tools, topology, release strategy, environment count, SLOs, backup retention, recovery objectives, approval roles, artifact signing, and deployment automation require ADRs.
