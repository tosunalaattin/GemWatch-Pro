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
- Avoid excessive duplication; identify the canonical source and link to it.

## Prohibited Practices

Do not use chat as project memory, invent facts or finalized technology, promise profit, conceal unresolved questions, publish secrets, leave placeholder-only required sections, copy stale state between documents, or change a binding decision without traceability.

## Future Detail

Lint configuration, style guide extensions, generated API documentation, diagram tooling, ownership metadata, review cadence, archival policy, terminology automation, and publication workflow await tooling ADRs.
