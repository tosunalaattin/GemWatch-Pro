import { parseServerConfig } from '@gemwatch/config';
import { createLogger, startTelemetry } from '@gemwatch/observability';
import { Redis } from 'ioredis';
import postgres from 'postgres';

import { type WorkerDependency, startWorker } from './worker.js';

const config = parseServerConfig(process.env);
const logger = createLogger({
  service: 'gemwatch-worker',
  environment: config.appEnv,
  version: config.appVersion,
  level: config.logLevel,
});
const telemetry = await startTelemetry({
  enabled: config.otelEnabled,
  serviceName: 'gemwatch-worker',
  endpoint: config.otelExporterOtlpEndpoint,
});
const sql = postgres(config.databaseUrl, { max: 1, connect_timeout: 2 });
const redis = new Redis(config.redisUrl, {
  lazyConnect: true,
  connectTimeout: 2_000,
  commandTimeout: 2_000,
  maxRetriesPerRequest: 0,
  enableOfflineQueue: false,
});
redis.on('error', () => undefined);

const postgresDependency: WorkerDependency = {
  check: async () => {
    await sql`select 1`;
  },
  close: async () => {
    await sql.end({ timeout: 2 });
  },
};
const redisDependency: WorkerDependency = {
  check: async () => {
    if (redis.status === 'wait') await redis.connect();
    await redis.ping();
  },
  close: async () => {
    redis.disconnect(false);
  },
};

const worker = await startWorker([postgresDependency, redisDependency], logger);
async function shutdown(signal: string): Promise<void> {
  logger.info({ event: 'service.shutdown', signal });
  await worker.stop();
  await telemetry.shutdown();
}
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => void shutdown(signal).finally(() => process.exit(0)));
}
