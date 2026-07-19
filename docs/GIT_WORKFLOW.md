# Git Workflow

## Purpose

Provide a traceable, secure, and reviewable collaboration model for repository changes.

## Binding Principles

The repository is the source of truth. History should explain intent. Changes are small, atomic, reviewed in proportion to risk, and synchronized with documentation.

## Mandatory Rules

- Start from verified repository state and preserve unrelated work.
- Normally branch from current `main` using `feat/`, `fix/`, `docs/`, `test/`, `refactor/`, `chore/`, or `security/` plus a concise kebab-case description.
- Use imperative Conventional Commit-style messages with a focused subject; explain rationale and impacts when the subject is insufficient.
- Link issues and ADRs, review the complete diff, run tests and checks, and scan for secrets before commit.
- Use pull requests for normal changes; require review appropriate to architecture, security, data, deployment, or financial risk.
- Update state, handoff, changelog, and affected documents before sprint closure.
- Protect `main`, retain audit history, and verify commit and push results.

## Prohibited Practices

Do not force push shared protected branches, rewrite published history without explicit coordination, commit secrets or generated noise, mix unrelated work, bypass review for production-impacting changes, fabricate identity or sign-off, or report Git actions that did not succeed.

## Future Detail

Hosting protection settings, required checks and reviewers, merge strategy, signing, release tags, changelog automation, ownership rules, bot permissions, and emergency hotfix procedure remain to be approved.
