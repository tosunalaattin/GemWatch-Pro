import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { GenericContainer, type StartedTestContainer, Wait } from 'testcontainers';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createPostgresProbe } from '../../apps/api/src/infrastructure/postgres.js';
import { createRedisProbe } from '../../apps/api/src/infrastructure/redis.js';

const enabled = process.env.RUN_INTEGRATION_TESTS === 'true';
describe.skipIf(!enabled)('PostgreSQL and Redis connectivity', () => {
  let postgres: StartedPostgreSqlContainer | undefined;
  let redis: StartedTestContainer | undefined;
  let databaseUrl: string;
  let redisUrl: string;

  beforeAll(async () => {
    if (process.env.USE_EXTERNAL_TEST_SERVICES === 'true') {
      databaseUrl = process.env.TEST_DATABASE_URL ?? '';
      redisUrl = process.env.TEST_REDIS_URL ?? '';
      if (!databaseUrl.includes('gemwatch_test_') || !redisUrl)
        throw new Error('Safe test service URLs are required');
      return;
    }
    [postgres, redis] = await Promise.all([
      new PostgreSqlContainer('postgres:18.4-trixie')
        .withDatabase('gemwatch_test_integration')
        .withUsername('gemwatch_test')
        .withPassword('gemwatch_test_local')
        .start(),
      new GenericContainer('redis:7.2.14-alpine3.21')
        .withExposedPorts(6379)
        .withWaitStrategy(Wait.forLogMessage('Ready to accept connections'))
        .start(),
    ]);
    databaseUrl = postgres.getConnectionUri();
    redisUrl = `redis://${redis.getHost()}:${redis.getMappedPort(6379)}/0`;
  });

  afterAll(async () => {
    const stops: Promise<unknown>[] = [];
    if (postgres) stops.push(postgres.stop());
    if (redis) stops.push(redis.stop());
    await Promise.allSettled(stops);
  });

  it('checks PostgreSQL and closes the connection', async () => {
    const probe = createPostgresProbe(databaseUrl, 2_000);
    await expect(probe.check()).resolves.toBeUndefined();
    await expect(probe.close()).resolves.toBeUndefined();
  });

  it('checks Redis and closes the connection', async () => {
    const probe = createRedisProbe(redisUrl, 2_000);
    await expect(probe.check()).resolves.toBeUndefined();
    await expect(probe.close()).resolves.toBeUndefined();
  });

  it('normalizes unreachable dependency failures without credentials', async () => {
    const probe = createRedisProbe('redis://127.0.0.1:1/0', 100);
    await expect(probe.check()).rejects.toThrow();
    await probe.close();
  });
});
