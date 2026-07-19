# Contributing to GemWatch Pro

## Required Reading

Before changing the repository, read in order: `docs/PROJECT_SESSION_STATE.md`, `docs/AI_HANDOFF.md`, `docs/AI_MEMORY.md`, `docs/GemWatch_Engineering_Specification.md`, relevant standards and ADRs, then `docs/CHANGELOG.md`.

## Branches and Commits

Use short, descriptive branches such as `feat/token-discovery`, `fix/risk-validation`, `docs/architecture`, or `chore/repository-maintenance`. Protect `main`; normal work should use pull requests. Use imperative Conventional Commit-style messages such as `docs: define provider boundary`. Keep changes small, atomic, reviewable, and limited to one coherent purpose.

## Validation and Documentation

Every behavioral change requires proportionate automated tests. A change is incomplete when relevant tests fail or were not run without a documented reason. Update the specification, ADRs, standards, changelog, session state, and AI handoff whenever the change affects them. Do not silently introduce architectural decisions.

## Secrets and Security Reports

Never commit credentials, wallet keys, seed phrases, tokens, private certificates, or populated environment files. Use approved secret storage and redacted examples. Do not disclose suspected vulnerabilities in a public issue; contact repository maintainers privately through an approved security channel. If no private channel is documented, request one without revealing exploit details.

## Pull Request Checklist

- [ ] Scope is focused and the branch name is descriptive.
- [ ] Related issue and ADR are linked where applicable.
- [ ] Tests were added or updated and their results are recorded.
- [ ] Security, financial-safety, data, and rollback impacts were assessed.
- [ ] No secrets or sensitive logs are included.
- [ ] Required documentation, changelog, state, and handoff files are updated.
- [ ] The change does not bypass the Risk Manager or enable live trading by default.
