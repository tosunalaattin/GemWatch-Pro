import { parseServerConfig } from '@gemwatch/config';
import { createLogger, startTelemetry } from '@gemwatch/observability';

import { createPostgresProbe } from './infrastructure/postgres.js';
import { createRedisProbe } from './infrastructure/redis.js';
import { buildServer } from './server.js';

const config = parseServerConfig(process.env);
const logger = createLogger({
  service: 'gemwatch-api',
  environment: config.appEnv,
  version: config.appVersion,
  level: config.logLevel,
});
const telemetry = await startTelemetry({
  enabled: config.otelEnabled,
  serviceName: config.otelServiceName,
  endpoint: config.otelExporterOtlpEndpoint,
});
const postgres = createPostgresProbe(config.databaseUrl);
const redis = createRedisProbe(config.redisUrl);
const app = await buildServer({
  dependencies: { postgres, redis },
  logger,
  corsAllowedOrigins: config.corsAllowedOrigins,
  production: config.nodeEnv === 'production',
});

async function shutdown(signal: string): Promise<void> {
  logger.info({ event: 'service.shutdown', signal });
  await app.close();
  await Promise.allSettled([postgres.close(), redis.close(), telemetry.shutdown()]);
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => void shutdown(signal).finally(() => process.exit(0)));
}

await app.listen({ host: config.apiHost, port: config.apiPort });
