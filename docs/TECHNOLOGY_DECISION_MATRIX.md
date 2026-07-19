# Technology Decision Matrix

## Method

Scores use 1–5: 1 = poor fit, 2 = significant limitations, 3 = acceptable, 4 = strong fit, and 5 = excellent fit. Weighted total is the sum of score multiplied by criterion weight, divided by 100; its range is 1.00–5.00. Scores compare project fit at Sprint 0.2, not universal product quality or benchmark performance. The matrix informs decisions but does not override safety constraints, operational context, or migration risk.

| Code | Criterion | Weight |
| --- | --- | ---: |
| SEC | Security | 15 |
| MAI | Maintainability | 13 |
| ECO | Ecosystem maturity | 11 |
| DX | Developer productivity | 11 |
| OPS | Operational simplicity | 11 |
| TST | Testability | 10 |
| RT | Real-time suitability | 8 |
| PER | Performance | 7 |
| SCL | Scalability | 6 |
| CST | Cost efficiency | 5 |
| IND | Vendor independence | 3 |
| | **Total** | **100** |

## Primary Language and Runtime

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **TypeScript + Node.js LTS** | 4 | 4 | 5 | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | **4.40** |
| Python | 4 | 4 | 5 | 4 | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 4.06 |
| Go | 5 | 4 | 5 | 3 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 4.36 |

TypeScript wins narrowly because shared web/backend contracts, mature web3 I/O, and one toolchain outweigh Go's runtime advantages. Go remains a future ingestion/CPU-worker candidate; Python remains a future analytical-service candidate.

## Web Frontend

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **React + Vite** | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | 5 | **4.59** |
| Next.js | 4 | 4 | 5 | 4 | 3 | 5 | 4 | 4 | 5 | 3 | 3 | 4.08 |
| Vanilla TypeScript | 4 | 2 | 5 | 2 | 4 | 3 | 3 | 5 | 2 | 5 | 5 | 3.48 |

The dashboard is SPA-heavy and SEO-light. Vite avoids an unnecessary server-rendering runtime; React avoids building complex UI primitives from scratch.

## Backend Framework

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Fastify** | 4 | 4 | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 5 | 5 | **4.55** |
| NestJS | 4 | 4 | 5 | 4 | 3 | 5 | 4 | 4 | 5 | 3 | 4 | 4.11 |
| Express | 3 | 3 | 5 | 5 | 5 | 4 | 4 | 3 | 4 | 5 | 5 | 4.06 |

Fastify's schema-first boundary, encapsulation, injection testing, and JSON logging provide useful controls without placing the domain inside a framework architecture.

## Monorepo and Package Management

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **pnpm workspaces + Turborepo** | 4 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 5 | 5 | 4 | **4.33** |
| npm workspaces | 4 | 4 | 5 | 4 | 5 | 4 | 3 | 4 | 3 | 5 | 5 | 4.16 |
| Yarn | 4 | 3 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 4 | 4 | 3.90 |
| Nx | 4 | 4 | 5 | 3 | 2 | 5 | 4 | 4 | 5 | 3 | 3 | 3.86 |

pnpm is the package manager; Turborepo is the task orchestrator. Nx offers more governance than the initial repository needs, while npm lacks the selected task graph and stricter dependency behavior.

## Primary Database

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **PostgreSQL** | 5 | 5 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 5 | **4.58** |
| MySQL | 5 | 4 | 5 | 4 | 4 | 5 | 3 | 4 | 5 | 4 | 5 | 4.37 |
| MongoDB | 4 | 4 | 5 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 4 | 4.17 |

PostgreSQL best unifies transactions, constraints, exact numeric values, JSONB, indexing, partitioning, and AWS-managed operation. Flexible provider payloads do not outweigh relational integrity requirements.

## Data Access and Migrations

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Drizzle** | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | 5 | 5 | **4.30** |
| Prisma | 4 | 4 | 5 | 5 | 4 | 5 | 3 | 3 | 4 | 4 | 4 | 4.17 |
| TypeORM | 3 | 3 | 4 | 4 | 4 | 3 | 3 | 3 | 4 | 5 | 5 | 3.55 |

Drizzle retains SQL control and emits reviewable migration SQL. Its younger ecosystem is offset by mandatory review, integration tests, raw-SQL support, and prohibition of direct schema push in shared environments.

## Cache, Locks, and Ephemeral State

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Redis** | 4 | 4 | 5 | 4 | 4 | 5 | 5 | 5 | 5 | 4 | 4 | **4.42** |
| PostgreSQL | 5 | 4 | 5 | 4 | 5 | 5 | 2 | 2 | 3 | 5 | 5 | 4.19 |
| In-memory | 2 | 3 | 5 | 5 | 5 | 4 | 2 | 5 | 1 | 5 | 5 | 3.71 |

Redis handles high-churn ephemeral workloads. PostgreSQL remains authoritative for idempotency and financial state; process memory cannot coordinate replicas.

## Asynchronous Jobs and Messaging

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **BullMQ + Redis** | 4 | 4 | 4 | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | **4.29** |
| PostgreSQL-backed queue | 5 | 4 | 4 | 4 | 5 | 5 | 3 | 3 | 3 | 5 | 5 | 4.23 |
| RabbitMQ | 5 | 4 | 5 | 3 | 2 | 5 | 5 | 4 | 5 | 3 | 5 | 4.15 |
| Kafka | 5 | 3 | 5 | 2 | 1 | 4 | 5 | 5 | 5 | 1 | 4 | 3.64 |
| AWS SQS | 5 | 4 | 5 | 4 | 5 | 5 | 5 | 4 | 5 | 4 | 1 | 4.52 |

SQS scores highest but creates AWS/local semantic divergence and lock-in at the initial stage. BullMQ reuses Redis and offers the best local/staging balance. An internal job port, PostgreSQL outbox, idempotent consumers, and DLQ/quarantine policy preserve an SQS migration path.

## API and Real-Time Communication

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **REST/OpenAPI + WebSocket** | 4 | 4 | 5 | 4 | 4 | 5 | 5 | 4 | 5 | 4 | 5 | **4.38** |
| GraphQL + subscriptions | 4 | 3 | 5 | 3 | 3 | 4 | 5 | 3 | 5 | 3 | 4 | 3.78 |
| REST + SSE | 4 | 4 | 5 | 5 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | 4.43 |

SSE scores slightly higher for one-way feeds, but WebSocket fits bidirectional dashboard operations. SSE remains permitted; GraphQL is deferred until query complexity proves its value.

## Blockchain Integration Boundary

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Internal chain adapters** | 5 | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 5 | 4 | 5 | **4.55** |
| Direct SDK in domain | 2 | 2 | 5 | 5 | 5 | 2 | 4 | 4 | 2 | 5 | 1 | 3.41 |
| Third-party-only ingestion | 3 | 3 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 1 | 3.59 |

Internal ports isolate RPC/WebSocket providers and chain semantics. Direct SDK coupling violates MEM-003; one external source cannot safely determine security state.

## External Provider Integration

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Internal provider adapters** | 5 | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 5 | 4 | 5 | **4.55** |
| Direct SDK clients | 2 | 2 | 5 | 5 | 5 | 2 | 4 | 4 | 2 | 5 | 1 | 3.41 |
| Single aggregation gateway | 3 | 3 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 1 | 3.59 |

Adapters standardize provenance, freshness, health, rate limits, retries, timeouts, and errors across provider categories while keeping raw evidence references.

## Observability

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **OpenTelemetry + JSON logs** | 5 | 4 | 5 | 3 | 3 | 5 | 5 | 4 | 5 | 4 | 5 | **4.31** |
| Vendor SDK | 4 | 3 | 5 | 4 | 4 | 4 | 4 | 4 | 5 | 3 | 1 | 3.90 |
| Structured logs only | 3 | 3 | 5 | 5 | 5 | 3 | 2 | 4 | 2 | 5 | 5 | 3.75 |

OTel preserves backend choice and trace/metric correlation. Structured JSON logs remain the log source while OTel JavaScript log APIs mature; vendor SDKs may appear only behind exporter boundaries.

## Testing

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Vitest + Testcontainers + Playwright** | 5 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 5 | **4.45** |
| Jest-centered suite | 4 | 4 | 5 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 5 | 4.16 |
| Node test + scripts | 4 | 4 | 5 | 3 | 5 | 3 | 3 | 5 | 3 | 5 | 5 | 4.02 |

The selected suite aligns with Vite, runs real infrastructure, and covers browsers. Contract, deterministic clock, property, load, security, backtest, and replay methods supplement it.

## Local Development

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Native Node + Compose infrastructure** | 4 | 5 | 5 | 5 | 4 | 5 | 4 | 4 | 4 | 5 | 5 | **4.53** |
| All native | 3 | 3 | 5 | 4 | 4 | 2 | 3 | 4 | 2 | 5 | 5 | 3.51 |
| Dev container | 4 | 4 | 5 | 3 | 3 | 5 | 4 | 4 | 4 | 4 | 5 | 4.02 |

Native app processes provide the best Windows debug loop; Compose standardizes PostgreSQL and Redis. WSL2 is supported, and dev containers remain optional.

## Continuous Integration

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **GitHub Actions** | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | 5 | 3 | **4.79** |
| Self-hosted CI | 3 | 3 | 4 | 2 | 1 | 4 | 4 | 5 | 5 | 2 | 5 | 3.23 |
| Other SaaS CI | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 3 | 2 | 4.16 |

Repository-native checks and managed runners minimize operational load. Actions must be commit-pinned with least-privilege permissions and protected environments.

## AWS Deployment

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| EC2 + Compose | 3 | 3 | 5 | 4 | 3 | 3 | 4 | 4 | 2 | 5 | 3 | 3.52 |
| **ECS Fargate** | 5 | 4 | 5 | 3 | 4 | 4 | 5 | 4 | 5 | 3 | 2 | **4.18** |
| EKS | 5 | 3 | 5 | 2 | 1 | 5 | 5 | 5 | 5 | 1 | 3 | 3.71 |
| Lambda | 5 | 4 | 5 | 3 | 4 | 4 | 2 | 4 | 5 | 4 | 2 | 3.99 |
| Hybrid | 4 | 3 | 5 | 2 | 2 | 4 | 5 | 4 | 5 | 2 | 2 | 3.52 |

Isolated EC2/Compose is accepted only for staging because existing capacity reduces cost. Fargate is the production direction for long-running API/listener/worker processes. EKS and hybrid complexity are unjustified; Lambda remains a later workload-specific option.

## Authentication and Authorization

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **AWS Cognito** | 5 | 4 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | 4 | 1 | **4.33** |
| Application-managed | 2 | 2 | 5 | 3 | 2 | 3 | 4 | 4 | 4 | 4 | 5 | 3.15 |
| Third-party managed | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | 3 | 1 | 4.63 |

Third-party managed identity scores highest generically, but Cognito reduces vendors and aligns with AWS. This is explicitly reviewable if cost, UX, portability, or recovery proves inadequate. Password management remains out of application scope.

## Numeric Precision and Time

| Candidate | SEC | MAI | ECO | DX | OPS | TST | RT | PER | SCL | CST | IND | Weighted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Integer + exact decimal + UTC** | 5 | 5 | 5 | 3 | 4 | 5 | 3 | 4 | 5 | 5 | 5 | **4.44** |
| JavaScript number | 2 | 2 | 5 | 5 | 5 | 2 | 5 | 5 | 5 | 5 | 5 | 3.86 |
| Untyped decimal strings | 4 | 3 | 5 | 3 | 4 | 4 | 3 | 3 | 4 | 5 | 5 | 3.80 |

Exact raw integers and decimals are mandatory despite lower convenience. JavaScript number and untyped strings cannot carry correctness-critical token or financial decisions.
