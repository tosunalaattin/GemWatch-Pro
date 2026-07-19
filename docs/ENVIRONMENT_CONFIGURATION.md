# Environment Configuration

Configuration is parsed once at server/worker boundaries and fails fast without printing values. `.env.example` is local-only. Browser-visible variables are explicitly prefixed `VITE_`; no secret may use that prefix.

| Name | Scope | Required | Type/default | Secret | Browser | Example | Validation and production rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `NODE_ENV` | Server | No | enum / `development` | No | No | `development` | development, test, or production; production uses safe errors/JSON logs |
| `APP_ENV` | All | No | string / `local` | No | No | `local` | Non-empty; production value must identify its environment |
| `APP_VERSION` | Server | No | literal / `0.0.3` | No | No | `0.0.3` | Must match repository version |
| `LOG_LEVEL` | Server | No | enum / `info` | No | No | `info` | Approved Pino levels only |
| `API_HOST` | API | No | host / `127.0.0.1` | No | No | `127.0.0.1` | Production bind is deployment-controlled |
| `API_PORT` | API | No | integer / `3000` | No | No | `3000` | 1–65535 |
| `WEB_PORT` | Web/dev | No | integer / `5173` | No | No | `5173` | 1–65535 |
| `WEB_API_BASE_URL` | Server/docs | No | URL / localhost | No | No | `http://127.0.0.1:3000` | HTTP(S); production must use approved TLS origin |
| `VITE_APP_VERSION` | Browser | No | string / `0.0.3` | No | Yes | `0.0.3` | Public metadata only |
| `VITE_APP_ENV` | Browser | No | string / `local` | No | Yes | `local` | Public environment label only |
| `VITE_API_BASE_URL` | Browser | No | URL / localhost | No | Yes | `http://127.0.0.1:3000` | HTTP(S), no embedded credentials; production allowlisted origin |
| `DATABASE_URL` | API/worker | Yes | URL | Yes | No | local-only PostgreSQL URL | Valid URL; secret store in production; never logged |
| `REDIS_URL` | API/worker | Yes | URL | Yes | No | local Redis URL | Valid URL; secret store in production; never logged |
| `CORS_ALLOWED_ORIGINS` | API | Yes | CSV URL list | No | No | local web origins | Exact allowlist; wildcard prohibited in production |
| `OTEL_ENABLED` | Server | No | boolean / `false` | No | No | `false` | Only `true` or `false` |
| `OTEL_SERVICE_NAME` | Server | No | string | No | No | `gemwatch-api` | Non-empty and environment-specific |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Server | No | URL / empty | Potentially | No | empty | Valid URL when set; credentials must not be embedded |
| `LIVE_TRADING_ENABLED` | All | No | literal / `false` | No | No | `false` | `true` is rejected; no implementation exists |
| `POSTGRES_HOST_PORT` | Compose | No | integer / `5432` | No | No | `5432` | Local host override only |
| `REDIS_HOST_PORT` | Compose | No | integer / `6379` | No | No | `6379` | Local host override only |
