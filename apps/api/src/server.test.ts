import { healthResponseSchema } from '@gemwatch/contracts';
import { createLogger } from '@gemwatch/observability';
import { afterEach, describe, expect, it } from 'vitest';

import type { DependencyProbe } from './infrastructure/dependency-probe.js';
import { buildServer } from './server.js';

const ok: DependencyProbe = { check: async () => undefined, close: async () => undefined };
const unavailable: DependencyProbe = {
  check: async () => Promise.reject(new Error('secret database-url must not leak')),
  close: async () => undefined,
};
const apps: Awaited<ReturnType<typeof buildServer>>[] = [];

async function create(postgres = ok, redis = ok) {
  const app = await buildServer({
    dependencies: { postgres, redis },
    logger: createLogger({
      service: 'test',
      environment: 'test',
      version: '0.0.4',
      level: 'silent',
    }),
    corsAllowedOrigins: ['http://127.0.0.1:5173'],
    production: true,
  });
  apps.push(app);
  return app;
}

afterEach(async () => Promise.all(apps.splice(0).map(async (app) => app.close())));

describe('health API', () => {
  it.each(['/health', '/health/live'])('returns a valid 200 response from %s', async (url) => {
    const response = await (await create()).inject({ method: 'GET', url });
    expect(response.statusCode).toBe(200);
    expect(healthResponseSchema.parse(response.json())).toBeTruthy();
  });

  it('returns ready when dependencies work', async () => {
    const response = await (await create()).inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(200);
    expect(healthResponseSchema.parse(response.json()).status).toBe('ok');
  });

  it.each([
    ['postgres', unavailable, ok],
    ['redis', ok, unavailable],
  ])('returns a redacted 503 when %s is unavailable', async (_name, postgres, redis) => {
    const response = await (
      await create(postgres, redis)
    ).inject({ method: 'GET', url: '/health/ready' });
    expect(response.statusCode).toBe(503);
    expect(response.body).not.toContain('database-url');
    expect(healthResponseSchema.parse(response.json()).status).toBe('degraded');
  });

  it('returns a safe 404', async () => {
    const response = await (await create()).inject({ method: 'GET', url: '/unknown' });
    expect(response.statusCode).toBe(404);
    expect(response.body).not.toContain('stack');
  });

  it('returns a safe invalid-request response', async () => {
    const response = await (
      await create()
    ).inject({
      method: 'POST',
      url: '/health',
      payload: '{',
      headers: { 'content-type': 'application/json' },
    });
    expect(response.statusCode).toBeGreaterThanOrEqual(400);
    expect(response.body).not.toContain('stack');
  });
});
