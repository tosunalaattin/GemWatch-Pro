# GemWatch Pro Engineering Specification

## 1. Document Control

- **Document version:** 0.3.0
- **Product version baseline:** 0.0.4
- **Status:** Living architecture specification
- **Date:** 2026-07-19
- **Owner:** GemWatch Pro maintainers
- **Source of truth:** This repository

Changes require review, traceability through Git, and an ADR when they establish or reverse a material architectural decision.

## 2. Purpose

This specification defines product boundaries, safety constraints, accepted architecture, conceptual capabilities, and delivery direction. ADR-0002 through ADR-0019 govern the initial stack. Sprint 0.3 implemented the development platform and health-only shells with exact dependency pins; domain capability remains unimplemented.

## 3. Product Vision

GemWatch Pro is envisioned as a modular on-chain alpha intelligence platform that detects newly created or newly liquid crypto assets, collects corroborating on-chain and market evidence, evaluates security and potential, and supports progressively controlled trading workflows. The platform should turn uncertain, fast-moving evidence into auditable decision support while preserving explicit human and automated safety gates.

## 4. Problem Statement

Early token markets are fragmented, adversarial, noisy, and time sensitive. No single provider offers complete or consistently trustworthy discovery, liquidity, ownership, contract, wallet, social, and execution context. Operators need a system that normalizes evidence, exposes uncertainty and provenance, ranks opportunities without promising outcomes, and prevents intelligence components from directly authorizing unsafe transactions.

## 5. Goals

- Discover candidate tokens and liquidity events with measured freshness and provenance.
- Aggregate multiple provider and direct-chain observations behind adapters.
- Evaluate contract, liquidity, holder, deployer, wallet, bot, MEV, and market risks.
- Produce explainable Risk, Potential, and Alpha scores with versioned inputs.
- Enable reproducible research, backtesting, and paper trading before live execution.
- Enforce risk-managed, auditable, opt-in execution controls.
- Support modular evolution, multi-chain expansion, observability, and operational review.

## 6. Non-Goals

The project does not guarantee profit, eliminate financial risk, provide personalized financial advice, or treat an AI response as transaction authorization. Sprint 0.3 implements only platform and health behavior. The initial chain, providers, product schema, score formulas, wallet custody, paper/live controls, and production deployment remain open until evaluated and recorded in later work.

## 7. Target Users

Potential users include on-chain researchers, security analysts, quantitative strategy developers, risk operators, and technically capable traders using decision support. Future roles and authorization boundaries require research; the product must not assume every user can configure wallets, approve strategies, or access sensitive operational data.

## 8. Core Product Capabilities

The intended capability set includes token and pool discovery; market, on-chain, contract, holder, deployer, smart-money, whale, sniper, MEV, and social intelligence; risk and potential analysis; ranking; strategy evaluation; historical replay; paper trading; portfolio and position controls; notifications; operational dashboards; and, only after safety gates, limited live execution. Each capability must have explicit inputs, outputs, ownership, failure behavior, and audit requirements before implementation.

## 9. Guiding Engineering Principles

The repository is the source of truth and documentation precedes implementation. Components should have narrow responsibilities and communicate through versioned contracts. External providers must be isolated behind adapters. Security evidence should be corroborated where practical. Defaults must be safe, failures visible, configuration separated by environment, and decisions reproducible. Irreversible or financially consequential actions require stronger controls than analysis.

## 10. High-Level System Context

The accepted starting architecture is a modular monolith with explicit bounded contexts, a React/Vite web client, a Fastify API boundary, and independently runnable Node.js workers. Provider and chain adapters introduce observations. PostgreSQL owns transactional truth; Redis supports ephemeral state and BullMQ jobs through an internal port and transactional outbox. A future Trade Engine can accept execution authorization only from Risk Manager. See [Architecture](ARCHITECTURE.md), [System Boundaries](SYSTEM_BOUNDARIES.md), and [Technology Evaluation](TECHNOLOGY_EVALUATION.md).

## 11. Functional Requirements

- The system shall record candidate assets, sources, observation times, chain context, and confidence or quality indicators.
- Provider-specific formats and SDK types shall be normalized through adapters before domain use.
- Security analysis shall preserve raw evidence, derived findings, freshness, and conflicting observations.
- Scoring shall expose score version, contributing factors, missing inputs, and explanatory output.
- Strategy evaluation shall consume immutable or version-addressable snapshots.
- Backtesting and paper trading shall use reproducible inputs and model realistic fees, latency, failures, liquidity, and slippage where supported.
- Notifications shall communicate severity, evidence, and uncertainty without implying guaranteed returns.
- Any future transaction intent shall pass authorization, simulation, policy, exposure, position, allowlist/denylist, and emergency-stop controls in the Risk Manager path.
- Material actions and configuration changes shall produce tamper-evident audit events.
- Durable cross-context publication shall use a transactional outbox and idempotent, at-least-once consumers.
- Token and financial quantities shall use integer or exact decimal-safe representations; durable timestamps shall be UTC with source and ingestion time separated.

Detailed acceptance criteria, event schemas, service-level objectives, and user workflows remain future work.

## 12. Non-Functional Requirements

The platform shall be secure, observable, testable, modular, recoverable, and horizontally evolvable. OpenTelemetry traces/metrics, structured JSON logs, explicit health, provenance, deterministic tests, bounded queues/retries, rate-limit tolerance, accessibility, privacy, and restore evidence are required directions. Numeric SLOs must be based on representative workloads.

## 13. Security and Safety Constraints

Secrets, private keys, and seed phrases must never enter the repository or general application logs. Least privilege, input validation, dependency controls, authenticated administrative boundaries, wallet/key isolation, transaction simulation, policy lists, emergency stop, audit logging, and incident response are mandatory design concerns. The Trade Engine may never bypass the Risk Manager. Live trading is opt-in, disabled by default, and cannot precede validated paper trading and controlled live tests. AI output cannot independently authorize a trade.

## 14. Data Source Strategy

Potential sources include DEX/on-chain providers, market aggregators, direct RPC/WebSocket endpoints, contract-analysis services, social sources, and internally derived observations. No provider or initial chain is selected here. Every integration implements the accepted adapter envelope with provider/request identity, normalized result, raw reference, provenance, timestamps, freshness/confidence, rate-limit state, timeout, classified retryability, circuit/health status, and terms review. Security-critical conclusions use independent corroboration where practical.

## 15. Scoring Model Concept

- **Risk Score:** a signal where a higher value means higher assessed risk. It should be explainable and reflect evidence quality, freshness, and uncertainty.
- **Potential Score:** a signal where a higher value means stronger assessed potential signals. It is not a prediction or promise of financial performance.
- **Alpha Score:** a composite ranking metric that combines security and potential signals while retaining uncertainty and gating constraints. It is not an investment guarantee and does not authorize a trade.

No mathematical formula, range, weighting, or threshold is fixed in this version. Candidate formulations will be researched, versioned, backtested, calibrated, and reviewed for leakage and bias before adoption.

## 16. Trading Lifecycle and Safety Gates

The required progression is research evidence, historical validation, strategy review, paper trading, controlled wallet integration, limited live testing, and only then explicitly approved expansion. Entry to each stage requires documented acceptance criteria and evidence from the previous stage. Future live intents must pass identity and authorization, fresh data checks, transaction simulation, Risk Manager policy, exposure and position limits, allowlist/denylist controls, human or approved policy authorization, and an operational emergency stop. A gate failure is deny-by-default and auditable.

## 17. Auditability Requirements

Audit records must identify event time, actor or service identity, correlation identifiers, source provenance, input or snapshot version, configuration and model or rule version, decision factors, gate outcomes, and resulting action. Sensitive values must be redacted. Research, paper, and live contexts must be distinguishable. Retention, integrity, access, clock synchronization, and export requirements will be formalized before implementation.

## 18. Deployment Context

Local development uses native Node/pnpm processes with Docker Compose PostgreSQL/Redis. GitHub Actions provides CI. Staging may use isolated Compose on the existing AWS host only with separation from Astro Sling. Production direction is ECS Fargate with RDS PostgreSQL, managed Redis after compatibility validation, S3, Secrets Manager, private networking, managed TLS/ingress, and OTel-compatible telemetry. Configuration and credentials remain isolated by environment; production readiness is not assumed.

## 19. Delivery Phases

Delivery begins with governance and architecture, then development foundations, discovery, aggregation, security and risk, scoring, historical validation, paper trading, user-facing operations, advanced intelligence, AI assistance, controlled wallets, limited live execution, multi-chain expansion, and production hardening. Each phase has entry and exit criteria in the [Roadmap](ROADMAP.md); phase order may change only with documented rationale and unchanged safety prerequisites.

## 20. Open Questions

Open questions include initial chain/provider coverage, latency/availability targets, data licensing/retention, detailed tenancy and Cognito configuration, scoring calibration, historical ground truth, UI supporting libraries, decimal library/scales, Redis managed-service compatibility, AWS region/sizing/RTO/RPO, regulatory constraints, wallet custody, live approval policy, budgets, and incident ownership.

## 21. Glossary

- **Adapter:** Boundary translating a provider-specific interface into an internal contract.
- **Alpha:** A research concept describing potential informational advantage; not guaranteed return.
- **Backtesting:** Evaluation of a versioned strategy against historical data with controlled assumptions.
- **Honeypot:** A token or contract behavior that may permit acquisition but prevent or penalize disposal.
- **MEV:** Maximal extractable value arising from transaction ordering, inclusion, or exclusion.
- **Paper trading:** Simulated trading with no real-money transaction submission.
- **Risk Manager:** Mandatory policy authority for any future execution intent.
- **Rug pull:** Malicious or harmful withdrawal or manipulation of liquidity or project controls.
- **Smart Money:** A hypothesis-based label for wallets with relevant behavior, requiring evidence and versioned criteria.
- **Trust boundary:** A point where data, identity, privilege, or control crosses between security contexts.

## 22. Document Change Policy

This is a living specification. Every change must state its intent through Git history, preserve verified facts and open questions, update cross-references, and align state, handoff, memory, roadmap, architecture, standards, and changelog as applicable. Material decisions require an ADR; superseded content must remain traceable. Sprint closure includes consistency and link validation.
