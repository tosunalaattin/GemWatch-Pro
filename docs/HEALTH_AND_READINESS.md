# Health and Readiness

## Contract

All shells use `@gemwatch/contracts` health contract `1.0.0`. Overall states are `ok`, `degraded`, and `unavailable`; dependency states are `ok`, `unavailable`, and `not_checked`. Responses include service, product version, ISO 8601 UTC time, and correlation ID. They never include URLs, credentials, stack traces, or raw dependency errors.

## Endpoints and HTTP Policy

- `/health` confirms the API can handle requests and does not query dependencies. It returns 200 while the process is healthy.
- `/health/live` is the liveness signal and returns 200 while the event loop/server is operating.
- `/health/ready` checks PostgreSQL with `SELECT 1` and Redis with `PING` under bounded timeouts. It returns 200 only when both are `ok`; otherwise it returns 503 with `degraded` and per-dependency state.

Liveness must not depend on remote services because doing so can cause restart loops. Readiness is intentionally stricter and should remove an instance from traffic without treating dependency loss as a process crash.

## Operations and Future Deployment

Health probes are suitable for future ECS/Kubernetes load-balancer, liveness, and readiness configuration after environment-specific intervals and thresholds are selected. Monitoring should alert on sustained readiness degradation and probe latency, not single transient failures. Probe logging is reduced to avoid noise.

Timeouts can create false negatives during brief load spikes; overly long timeouts create false positives and delayed traffic removal. A successful query can still miss partial degradation, while a failed shared dependency can make every instance unready. Thresholds and deeper synthetic checks remain production-hardening work.
