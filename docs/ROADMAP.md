# GemWatch Pro Roadmap

This roadmap is ordered by dependency and safety maturity. Dates and technologies are intentionally unset. Completing a phase requires evidence against its exit criteria; later-phase experimentation cannot waive earlier safety gates.

## Phase 0: Governance and Architecture

- **Objective:** Establish durable project memory, scope, conceptual boundaries, and decision governance.
- **Principal deliverables:** Repository skeleton, specification, architecture, standards, roadmap, ADR process, state, handoff, and contribution workflow.
- **Entry criteria:** Repository ownership and product vision are identified.
- **Exit criteria:** Required documents are consistent, reviewed, versioned, and provide an explicit next task.
- **Major risks:** Premature technology choices, stale documents, hidden decisions, and scope expansion.
- **Explicit exclusions:** Application code, integrations, persistence, UI, deployment, paper trading, and live trading.

## Phase 1: Development Platform and Core Foundations

- **Objective:** Select and establish a secure, reproducible development platform and shared contracts.
- **Principal deliverables:** Accepted technology ADRs, local workflow, CI quality gates, configuration model, contract conventions, observability baseline, and test harness.
- **Entry criteria:** Phase 0 exit criteria and agreed evaluation method.
- **Exit criteria:** Reproducible setup and CI validate a minimal foundation with no business feature claims.
- **Major risks:** Stack lock-in, weak secret handling, irreproducible tooling, and premature service decomposition.
- **Explicit exclusions:** Production trading, broad provider ingestion, and unvalidated scoring.

## Phase 2: Token Discovery

- **Objective:** Detect and normalize candidate token and liquidity events.
- **Principal deliverables:** Adapter contracts, candidate identity, provenance, deduplication, freshness metrics, fixtures, and discovery observability.
- **Entry criteria:** Stable development foundation and selected initial source evaluation.
- **Exit criteria:** Test and controlled-source events are reproducibly discovered with measured quality and failure behavior.
- **Major risks:** Missed events, duplicates, chain reorganization, spoofed identifiers, rate limits, and source outages.
- **Explicit exclusions:** Investment ranking, paper orders, and real transactions.

## Phase 3: Market and On-Chain Data Aggregation

- **Objective:** Build provider-neutral, traceable evidence snapshots.
- **Principal deliverables:** Market/on-chain adapters, normalization contracts, provenance, quality flags, cache and retry semantics, and reconciliation.
- **Entry criteria:** Versioned asset identity and discovery events.
- **Exit criteria:** Corroborated snapshots expose freshness, gaps, conflicts, and provider health under tests.
- **Major risks:** Schema drift, stale data, licensing constraints, inconsistent decimals, and false agreement.
- **Explicit exclusions:** Final security verdicts, score formulas, and execution.

## Phase 4: Security and Risk Analysis

- **Objective:** Derive explainable security findings and risk signals from multiple evidence types.
- **Principal deliverables:** Contract, liquidity, ownership, holder, deployer, honeypot, rug, and risk-analysis rules with provenance and uncertainty.
- **Entry criteria:** Reliable versioned evidence snapshots and defined threat models.
- **Exit criteria:** Curated cases and adversarial tests demonstrate explainability, safe missing-data behavior, and practical corroboration.
- **Major risks:** False assurance, adversarial contracts, provider dependence, outdated findings, and chain-specific assumptions.
- **Explicit exclusions:** Profit claims, autonomous transactions, and fixed Alpha formula.

## Phase 5: Scoring and Ranking

- **Objective:** Version, explain, and calibrate Risk, Potential, and Alpha ranking concepts.
- **Principal deliverables:** Feature registry, candidate formulas, score versions, explanations, uncertainty, calibration plan, and bias/leakage review.
- **Entry criteria:** Quality-controlled evidence and validated risk findings.
- **Exit criteria:** Offline evaluation shows reproducible rankings and limitations against documented acceptance criteria.
- **Major risks:** Overfitting, label leakage, unstable weights, misleading precision, and hidden missing-data effects.
- **Explicit exclusions:** Guaranteed outcomes and score-only trade authorization.

## Phase 6: Historical Data and Backtesting

- **Objective:** Reproduce historical decisions and evaluate strategies under realistic assumptions.
- **Principal deliverables:** Versioned datasets, replay engine, cost/slippage/latency models, deterministic runs, benchmarks, and reports.
- **Entry criteria:** Versioned signals and candidate strategy contracts.
- **Exit criteria:** Repeated runs are reproducible, leakage checks pass, and limitations and sensitivity are documented.
- **Major risks:** Survivorship bias, unavailable historical features, unrealistic fills, look-ahead bias, and corrupted data.
- **Explicit exclusions:** Real orders and promotion based on a single favorable result.

## Phase 7: Paper Trading

- **Objective:** Validate strategies and operational controls in forward simulation without capital.
- **Principal deliverables:** Paper order lifecycle, simulated fills, positions, portfolio controls, reconciliation, audit, alerts, and performance review.
- **Entry criteria:** Backtesting exit evidence and approved paper-trading acceptance thresholds.
- **Exit criteria:** Sustained controlled runs meet reliability, risk, reconciliation, and incident-drill criteria with reviewed evidence.
- **Major risks:** Simulation/live mismatch, stale state, unrealistic liquidity, uncontrolled strategies, and misleading performance.
- **Explicit exclusions:** Private-key access, signing, broadcasting, or real-money claims.

## Phase 8: Dashboard and Notifications

- **Objective:** Provide usable, role-aware visibility into evidence, scores, positions, health, and alerts.
- **Principal deliverables:** Operational and research views, explanations, notification policies, redaction, acknowledgement, accessibility, and audit links.
- **Entry criteria:** Stable observable research and paper workflows.
- **Exit criteria:** Users can trace decisions and incidents without exposure of secrets or misleading certainty.
- **Major risks:** Alert fatigue, data leakage, stale displays, authorization errors, and confusing score presentation.
- **Explicit exclusions:** UI shortcuts around risk controls and default live execution.

## Phase 9: Smart Money, Whale, Sniper and MEV Intelligence

- **Objective:** Add evidence-based wallet and transaction-behavior intelligence.
- **Principal deliverables:** Versioned labeling criteria, wallet clustering hypotheses, whale flows, sniper and MEV indicators, confidence, and evaluation datasets.
- **Entry criteria:** Mature data lineage and scoring evaluation processes.
- **Exit criteria:** Signals demonstrate incremental, reproducible value and documented false-positive and privacy limits.
- **Major risks:** Mislabeling, adversarial evasion, privacy impact, chain-specific bias, and circular scoring.
- **Explicit exclusions:** Doxxing, unsupported identity claims, and automatic execution based on labels.

## Phase 10: AI-Assisted Analysis

- **Objective:** Add bounded AI synthesis and explanation while preserving deterministic controls.
- **Principal deliverables:** Approved use cases, grounded inputs, evaluations, prompt/model versions, output labeling, injection defenses, and audit records.
- **Entry criteria:** Stable source provenance and non-AI baseline workflows.
- **Exit criteria:** Evaluations show useful, monitored assistance with safe failure and no authorization path.
- **Major risks:** Hallucination, prompt injection, data leakage, non-determinism, drift, and overreliance.
- **Explicit exclusions:** AI-only trade approval, secret access, and unreviewed autonomous actions.

## Phase 11: Controlled Wallet Integration

- **Objective:** Design and validate isolated wallet connectivity without general live trading.
- **Principal deliverables:** Custody ADR, key isolation, authorization, simulation, policy controls, test wallets, rotation, recovery, emergency stop, and threat model.
- **Entry criteria:** Successful paper-trading exit review, security review, incident readiness, and explicit approval.
- **Exit criteria:** Non-production and tightly bounded tests prove isolation, deny-by-default controls, audit, recovery, and emergency-stop behavior.
- **Major risks:** Key compromise, unintended signing, privilege escalation, dependency compromise, and environment confusion.
- **Explicit exclusions:** Unbounded capital, unattended general execution, production keys in application services, and mainnet scale-up.

## Phase 12: Limited Live Trading

- **Objective:** Validate end-to-end controls with explicitly approved, minimal exposure.
- **Principal deliverables:** Risk Manager enforcement, allowlists/denylists, transaction simulation, limits, approvals, reconciliation, monitoring, stop controls, and incident runbooks.
- **Entry criteria:** Phase 11 exit evidence, independent security review, legal/operational review, named owners, approved loss limits, rollback, and explicit opt-in.
- **Exit criteria:** Time-bounded trials remain within limits, reconcile completely, pass incident drills, and receive documented go/no-go review.
- **Major risks:** Capital loss, chain congestion, MEV, contract exploits, stale decisions, control bypass, and operator error.
- **Explicit exclusions:** Default enablement, guaranteed returns, broad users/chains/strategies, bypassing Risk Manager, and expansion without new approval.

## Phase 13: Multi-Chain Expansion

- **Objective:** Extend validated capabilities while preserving chain-specific safety and evidence quality.
- **Principal deliverables:** Chain adapters, identity semantics, reorganization/finality policy, chain threat models, per-chain risk calibration, and operations.
- **Entry criteria:** Stable bounded capability on the initial scope and an approved expansion ADR.
- **Exit criteria:** Each added chain meets the same discovery, data, security, validation, audit, and operational gates independently.
- **Major risks:** Semantic mismatch, fragmented liquidity, bridge risk, inconsistent finality, and operational overload.
- **Explicit exclusions:** Assuming one chain's models or thresholds transfer unchanged.

## Phase 14: Production Hardening and Scale

- **Objective:** Meet approved reliability, security, recovery, cost, and operational scale targets.
- **Principal deliverables:** SLOs, capacity evidence, resilience, backups and restore tests, disaster recovery, supply-chain hardening, audits, cost controls, and runbooks.
- **Entry criteria:** Proven workflows, measured demand, stable architecture, and approved production requirements.
- **Exit criteria:** Independent reviews and exercises verify SLOs, recovery, security, audit, and operational ownership.
- **Major risks:** Complex failure modes, cost growth, alert overload, supply-chain attacks, and recovery gaps.
- **Explicit exclusions:** Removing safety gates for throughput or treating production readiness as a profitability claim.
