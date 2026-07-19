# Security Standard

## Purpose

Establish mandatory security and financial-safety expectations across design, development, deployment, and operations.

## Binding Principles

Assume external data and dependencies are untrusted. Apply least privilege, separation of duties, defense in depth, deny-by-default controls, secure defaults, auditable decisions, and practical corroboration. Financial impact requires stronger gates than analysis.

## Mandatory Rules

- **Secret management:** Keep credentials, tokens, seed phrases, and private keys out of Git, logs, fixtures, AI context, and general configuration; use approved secret storage, rotation, revocation, and scanning.
- **Least privilege:** Scope identities, network access, data access, and service capabilities to minimum need with explicit environment separation.
- **Input validation:** Validate and bound all external, provider, user, chain, file, and message input; defend against injection, replay, malformed values, and resource exhaustion.
- **Dependency safety:** Pin and review dependencies as appropriate, scan known vulnerabilities and licenses, minimize transitive risk, and document update response.
- **Authentication and authorization:** Enforce at trust boundaries and separate research, operator, configuration, wallet, approval, and execution privileges.
- **Identity provider:** Use Cognito OIDC authorization-code with PKCE; prohibit implicit flow and application-managed production passwords. Validate issuer, audience, signature, expiry, state, nonce, callbacks, sessions, and revocation.
- **Wallet and key isolation:** Keep keys within a dedicated signing boundary; general services and AI components never receive key material.
- **Transaction simulation:** Simulate future transactions against fresh state before approval and treat simulation failure or ambiguity as denial.
- **Allowlist and denylist controls:** Apply versioned, audited policy to assets, contracts, methods, destinations, chains, strategies, and wallets where appropriate.
- **Emergency stop:** Provide tested, authorized, observable stop controls independent of normal strategy flow.
- **Audit log:** Record actors, inputs, versions, policy outcomes, approvals, simulations, attempts, configuration changes, and results with sensitive fields redacted.
- **Supply-chain security:** Protect source, CI, artifacts, dependencies, build provenance, reviews, and release authorization.
- **CI security:** GitHub Actions uses read-only default permissions, commit-pinned actions, protected environments, frozen lockfile, and short-lived AWS OIDC roles rather than long-lived cloud keys.
- **Data and telemetry:** Exact numeric/UTC policies are safety controls; OTel/logs use allowlisted attributes, redaction, bounded cardinality, and no secret/raw payload capture.
- **Staging isolation:** Any shared AWS host isolates GemWatch from Astro Sling by user, process, directory, Docker network, ports, volumes, secrets, resources, reverse proxy, firewall, monitoring, and rollback.
- **Incident handling:** Maintain classification, containment, revocation, recovery, evidence preservation, communication, and post-incident learning procedures.
- **Responsible disclosure:** Route vulnerabilities privately and never require public exploit details.

## Prohibited Practices

Never bypass the Risk Manager, enable live trading by default, authorize trades solely from AI or scores, embed secrets, expose wallet keys, trust one security source without considering corroboration, deploy unreviewed production changes, suppress security failures, or weaken controls for convenience.

## Accepted Technology Direction

Provider/chain input enters only through adapters. PostgreSQL is authoritative; Redis locks/caches cannot solely protect irreversible actions. Audit is separate from sampled telemetry. Production direction uses private AWS data networks, Secrets Manager, managed TLS, least-privilege task roles, and encrypted RDS/backups.

## Future Detail

Cognito detailed policy, cryptography, custody/signing, wallet/live step-up, vulnerability SLAs, scanner selection, AWS topology, retention/compliance, disclosure contact, and incident objectives require later threat models/ADRs.
