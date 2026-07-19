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
- Require GitHub Actions gates for format, lint, typecheck, tests, build, dependency/secret/license checks, migration/docs validation, and container scan when applicable.
- Pin CI actions to reviewed commits, use minimum permissions, and use protected environments/OIDC for future AWS changes.

## Prohibited Practices

Do not force push shared protected branches, rewrite published history without explicit coordination, commit secrets or generated noise, mix unrelated work, bypass review for production-impacting changes, fabricate identity or sign-off, or report Git actions that did not succeed.

## Accepted Technology Direction

GitHub Actions is the CI system, pnpm lockfile changes require review, and ADR-impacting changes update decision records before implementation. Direct unreviewed production deployment and force pushes remain prohibited.

## Future Detail

Exact branch-protection settings, required check names/reviewers, merge strategy, commit/artifact signing, releases/tags, CODEOWNERS, bots, and hotfix procedure are implemented in later governance work.
