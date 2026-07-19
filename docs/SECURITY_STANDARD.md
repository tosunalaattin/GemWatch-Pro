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
- **Wallet and key isolation:** Keep keys within a dedicated signing boundary; general services and AI components never receive key material.
- **Transaction simulation:** Simulate future transactions against fresh state before approval and treat simulation failure or ambiguity as denial.
- **Allowlist and denylist controls:** Apply versioned, audited policy to assets, contracts, methods, destinations, chains, strategies, and wallets where appropriate.
- **Emergency stop:** Provide tested, authorized, observable stop controls independent of normal strategy flow.
- **Audit log:** Record actors, inputs, versions, policy outcomes, approvals, simulations, attempts, configuration changes, and results with sensitive fields redacted.
- **Supply-chain security:** Protect source, CI, artifacts, dependencies, build provenance, reviews, and release authorization.
- **Incident handling:** Maintain classification, containment, revocation, recovery, evidence preservation, communication, and post-incident learning procedures.
- **Responsible disclosure:** Route vulnerabilities privately and never require public exploit details.

## Prohibited Practices

Never bypass the Risk Manager, enable live trading by default, authorize trades solely from AI or scores, embed secrets, expose wallet keys, trust one security source without considering corroboration, deploy unreviewed production changes, suppress security failures, or weaken controls for convenience.

## Future Detail

Identity provider, cryptographic mechanisms, custody model, signing technology, vulnerability severity targets, security testing tools, network topology, retention, compliance obligations, disclosure contact, and incident service levels require threat modeling and ADRs.
