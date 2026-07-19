# AI Memory

These records are persistent constraints. Changes require explicit review, synchronized documentation, and an ADR when architectural.

## MEM-001: GitHub Repository Is the Source of Truth

- **Decision:** Code, technical documentation, project state, and AI handoff knowledge are authoritative only when stored in the repository.
- **Rationale:** Chat history and local recollection are incomplete and non-durable.
- **Consequences:** Inspect Git before work; persist outcomes and reject conflicting chat claims.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-002: Documentation Precedes Implementation

- **Decision:** Material architecture and behavioral intent must be documented before application code implements them.
- **Rationale:** Reviewable intent reduces accidental coupling and hidden decisions.
- **Consequences:** Update specifications or ADRs first; undocumented design is not approved.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-003: Provider Integrations Require Adapters

- **Decision:** External providers must connect through provider adapters rather than directly to business logic.
- **Rationale:** Providers differ in schemas, quality, limits, availability, and lifecycle.
- **Consequences:** Internal contracts remain provider-neutral and integrations expose provenance and failure.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-004: Risk Manager Cannot Be Bypassed

- **Decision:** The Trade Engine must never execute an intent that has not passed the Risk Manager path.
- **Rationale:** Central, auditable enforcement is required for financial safety.
- **Consequences:** Bypass paths are prohibited; gate failure denies execution and is audited.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-005: Paper Trading Precedes Live Trading

- **Decision:** Validated paper trading is a mandatory predecessor to any live trading stage.
- **Rationale:** Strategies and operational controls need evidence without risking capital.
- **Consequences:** Live work cannot advance without documented paper-trading exit evidence.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-006: Live Trading Is Opt-In and Disabled by Default

- **Decision:** Live trading requires explicit enablement and is off by default in every environment and new configuration.
- **Rationale:** Safe defaults reduce accidental transaction risk.
- **Consequences:** Missing, ambiguous, or invalid configuration must not enable execution.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-007: Secrets Never Enter the Repository

- **Decision:** API secrets, private keys, seed phrases, credentials, and sensitive certificates must not be committed.
- **Rationale:** Git history is durable and broadly replicated.
- **Consequences:** Use approved secret stores, redacted logs, scanners, and trackable examples without values.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-008: AI Output Cannot Independently Authorize a Trade

- **Decision:** AI analysis alone cannot approve, sign, or submit a transaction.
- **Rationale:** Model output is probabilistic and susceptible to bad or adversarial context.
- **Consequences:** AI remains advisory and all execution gates remain independently enforced.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-009: Scores Are Decision-Support Signals, Not Guarantees

- **Decision:** Risk, Potential, and Alpha scores inform ranking and review but promise no result.
- **Rationale:** Markets and source evidence are uncertain and non-stationary.
- **Consequences:** Scores require explanations, versions, validation, uncertainty, and non-guarantee language.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-010: Each Sprint Closes with Documentation and State Updates

- **Decision:** Sprint closure updates state, changelog, handoff, and every materially affected living document.
- **Rationale:** The repository must remain resumable without chat history.
- **Consequences:** A sprint is not complete while its repository narrative is stale or contradictory.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-011: External Security Data Must Be Corroborated Where Practical

- **Decision:** Security conclusions must not depend uncritically on one external source and should be corroborated where practical.
- **Rationale:** Providers can be stale, unavailable, incomplete, or wrong.
- **Consequences:** Preserve provenance, conflicts, freshness, missing data, and independent evidence.
- **Status:** Accepted
- **Date:** 2026-07-19

## MEM-012: Technology Choices Require Explicit ADRs

- **Decision:** Material choices of language, framework, persistence, messaging, deployment, chain, or provider require accepted ADRs.
- **Rationale:** Technology has long-lived operational and security consequences.
- **Consequences:** Placeholders and proposals are not selections; compare options and document decisions.
- **Status:** Accepted
- **Date:** 2026-07-19
