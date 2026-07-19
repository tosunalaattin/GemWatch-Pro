# Documentation Standard

## Purpose

Keep technical knowledge durable, discoverable, accurate, and sufficient for a new human or AI session to resume from repository evidence.

## Binding Principles

Documentation is part of the product and precedes implementation of material decisions. It must distinguish fact, decision, proposal, assumption, risk, and open question. Repository documents are written in English; requested user-facing summaries may use another language.

## Mandatory Rules

- Give documents clear purpose, scope, status, ownership or decision authority, and reviewable Git history.
- Use relative links for repository documents, stable headings, simple GitHub-compatible Markdown and Mermaid, and accessible labels.
- Record material architecture decisions in ADRs and never erase accepted decision history.
- Define terms, units, dates, versions, provenance, uncertainty, safety constraints, and exclusions where relevant.
- Update specification, architecture, roadmap, standards, memory, state, handoff, and changelog according to impact.
- At sprint close, reconcile contradictions, validate links and diagrams, update `Last Updated`, and define a verifiable next task.
- Keep technology evaluation, decision matrix, system/data/event/observability/development/AWS architecture, ADRs, memory, specification, state, and handoff synchronized when architecture changes.
- Cite official/primary sources for current technology support and constraints; record research date and mark unresolved compatibility/pricing as external verification.
- Avoid excessive duplication; identify the canonical source and link to it.

## Prohibited Practices

Do not use chat as project memory, invent facts or finalized technology, promise profit, conceal unresolved questions, publish secrets, leave placeholder-only required sections, copy stale state between documents, or change a binding decision without traceability.

## Accepted Technology Direction

Sprint 0.3 will implement Markdown/link/Mermaid/ADR/version validation in root scripts and CI. OpenAPI/event schemas become generated documentation only after contracts exist; generated output never replaces canonical source.

## Future Detail

Lint rule set, ownership metadata, generated-document publication, diagram rendering, review cadence, archival, terminology automation, and docs-site strategy remain open.

## Implemented Platform Rules

`check-docs.mjs` validates required documents, relative links, fences/Mermaid balance, unique ADR numbering, state/changelog version alignment, absolute local paths, and secret-like content. Markdown remains human-maintained and is checked separately from Prettier source formatting. Sprint close synchronizes state, handoff, memory, specification, changelog, and affected standards.
