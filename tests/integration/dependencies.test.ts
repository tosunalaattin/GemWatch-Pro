import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { GenericContainer, type StartedTestContainer, Wait } from 'testcontainers';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { assertSafeTestDatabaseUrl } from '../../packages/testing/src/index.js';
import { withTimeout } from '../../apps/api/src/infrastructure/dependency-probe.js';
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
      assertSafeTestDatabaseUrl(databaseUrl);
      if (!redisUrl) throw new Error('A safe test Redis URL is required');
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
    assertSafeTestDatabaseUrl(databaseUrl);
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
    const error = await probe.check().catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(Error);
    expect(String(error)).not.toContain('redis://');
    await probe.close();
  });

  it('bounds dependency checks with a normalized timeout', async () => {
    await expect(withTimeout(new Promise(() => undefined), 25)).rejects.toThrow(
      'Dependency check timed out',
    );
  });

  it('rejects production-like test database credentials', () => {
    expect(() =>
      assertSafeTestDatabaseUrl('postgresql://production:secret@127.0.0.1/gemwatch_test_prod'),
    ).toThrow('Production-like credentials are prohibited in tests');
  });
});
