# ADR-0018: Authentication and Authorization Boundary

- **Status:** Accepted
- **Date:** 2026-07-19
- **Decision owners:** GemWatch Pro maintainers
- **Related documents:** [System Boundaries](../SYSTEM_BOUNDARIES.md), [Security Standard](../SECURITY_STANDARD.md), [AWS Deployment Architecture](../AWS_DEPLOYMENT_ARCHITECTURE.md)

## Context

Even an owner-first application needs secure sessions, MFA readiness, admin separation, API authorization, wallet-operation controls, audit, re-authentication, and emergency lockout without owning passwords.

## Decision Drivers

Credential security, managed operations, OIDC/OAuth standards, MFA, AWS integration, role/capability separation, audit, and future users.

## Considered Options

Application-managed authentication, generic managed identity, AWS Cognito, and third-party auth providers.

## Decision

Use AWS Cognito user pools as the initial managed identity provider with OIDC authorization-code flow and PKCE; implicit flow is prohibited. The application owns authorization using explicit roles/capabilities and server-side validation. Initial roles are owner/admin, operator, and read-only as a starting model. Future wallet/live actions require step-up re-authentication, independent Risk Manager policy, audit, and emergency lockout.

## Consequences

### Positive

Passwords/MFA/recovery are managed outside the application while domain authorization stays explicit.

### Negative

AWS coupling and non-trivial Cognito configuration/local testing.

### Risks

Token leakage, incorrect claim validation, permissive callbacks/scopes, lockout failure, or treating identity as trade authority.

## Rejected Alternatives

Application-managed credentials create avoidable risk; third-party managed providers are viable but add another vendor and are deferred.

## Implementation Constraints

Dedicated environment pools/clients, exact issuer/audience/signature/expiry validation, PKCE/state/nonce, secure HttpOnly/SameSite cookie or reviewed session pattern, no long-lived browser storage, CSRF protection, revocation, MFA readiness, least scopes, audit, and no identity claim directly authorizes Trade Execution.

## Validation Criteria

Authentication/session/expiry/revocation, role matrix, admin boundary, callback abuse, CSRF, lockout, MFA readiness, step-up mock, audit, and denied wallet/live paths.

## Review Conditions

Review if Cognito cost, UX, portability, recovery/export, availability, or tenancy requirements are inadequate; preserve OIDC and application-owned authorization.
