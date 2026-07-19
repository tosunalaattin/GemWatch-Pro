# AI Handoff

## Project Summary

GemWatch Pro is a planned modular platform for discovery and evidence-based assessment of new crypto assets, progressing from research and backtesting to paper trading and only later to tightly controlled live execution. Scores and AI analysis are decision support, not guarantees or transaction authority.

## Current Stage

Foundation, after completion of Sprint 0.1. The repository contains documentation and placeholders only. Application code, integrations, persistence, deployments, paper trading, wallet integration, and live trading have not started.

## Completed Work

The monorepo skeleton, repository policies, GitHub templates, specification 0.1.0, conceptual architecture, roadmap, engineering standards, ADR process, ADR-0001, persistent AI protocol and memory, session state, handoff, changelog, license, and version baseline are established.

## Not Yet Done

No technology, provider, chain, database, runtime, deployment target, scoring formula, identity model, custody model, or service contract is approved. No application behavior exists. Do not infer these choices from placeholder directory names.

## Binding Decisions

Read `AI_MEMORY.md` for the canonical numbered list. The repository is the source of truth; documentation precedes implementation; providers use adapters; the Trade Engine cannot bypass the Risk Manager; paper trading precedes live trading; live trading is opt-in and disabled by default; secrets stay out of Git; AI cannot independently authorize trades; security evidence should be corroborated; material technology choices require ADRs.

## Principles That Must Not Be Changed Silently

Do not weaken financial-safety gates, secret isolation, auditability, evidence provenance, deny-by-default behavior, provider boundaries, or the separation of analysis from authorization. Any proposed change requires explicit rationale, impact analysis, and the applicable ADR process.

## Required Reading Order

1. `PROJECT_SESSION_STATE.md`
2. `AI_HANDOFF.md`
3. `AI_MEMORY.md`
4. `GemWatch_Engineering_Specification.md`
5. `ARCHITECTURE.md`
6. Relevant standards and `adr/` records
7. `ROADMAP.md`
8. `CHANGELOG.md`

## Sprint 0.1 Outcome

The governance and documentation foundation is complete at product version 0.0.1 and specification version 0.1.0. The repository can communicate current state and next work without relying on chat history.

## Next Task

Execute Sprint 0.2 — Architecture Decision and Technology Evaluation. Define weighted evaluation criteria, research viable alternatives, document constraints and tradeoffs, and create ADRs for choices that are actually accepted. Do not write application features or preselect a stack.

## Output and Validation Rules

Keep repository artifacts in English. Before closing work, verify requested files, tests appropriate to scope, links, diagrams, secrets, formatting, Git diff, and documentation consistency. User-facing sprint summaries may follow the user's requested language. Report failed or skipped checks honestly.

## Evidence, Assumptions, and Hallucination

Never state unknown provider behavior, product capability, performance, regulatory status, or repository state as fact. Label assumptions, cite or record evidence, preserve open questions, and prefer an explicit unresolved item to fabricated certainty.

## Repository-First Rule

Before making changes, inspect the actual working tree, branch, remotes, recent history, current state, and relevant documentation. Repository evidence overrides contradictory chat context. Preserve unrelated user changes.

## Sprint-Close Updates

At every sprint close, update at minimum `PROJECT_SESSION_STATE.md`, `AI_HANDOFF.md`, and `CHANGELOG.md`; update `AI_MEMORY.md`, the specification, architecture, roadmap, standards, and ADRs whenever decisions or scope affect them. Define a clear and verifiable next task.
