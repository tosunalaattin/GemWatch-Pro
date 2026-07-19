# CI Security Baseline

## Purpose and Triggers

`ci.yml` gates pull requests and pushes to `main` with format, lint, strict type checking, unit tests, build, documentation/workspace validation, integration tests, and a Chromium smoke test. `security.yml` runs on pull requests, `main`, manual dispatch, and a weekly schedule.

## Trust and Permissions

Workflows declare read-only repository permissions, never use `pull_request_target`, do not interpolate untrusted PR metadata into shell commands, receive no production secret, and contain no deployment step. Official GitHub actions and the official pnpm setup action are pinned to full commit SHAs with credential persistence disabled.

## Supply-Chain Gates

The package lock is installed frozen. pnpm build-script allow/deny decisions are explicit. The security workflow installs with scripts disabled, verifies the sole lockfile, runs a high-severity dependency audit, scans tracked content for secret patterns, and validates environment safety. The local scanner is a baseline, not a substitute for GitHub secret scanning or historical scanning.

## Services, Cache, and Artifacts

Integration CI uses exact PostgreSQL and Redis service images with health checks and local test credentials. pnpm cache keys derive from `pnpm-lock.yaml`; caches contain dependencies, not credentials. No artifact is uploaded by default. Failure output must be redacted and retained only under repository/org policy.

## Failure Handling and Future Protection

Any gate failure blocks sprint-success claims and should block branch protection once configured. Future work may add dependency review, CodeQL, SBOM/provenance signing, historical secret scanning, artifact attestations, and protected-environment approvals after explicit evaluation. CI does not deploy or access AWS.
