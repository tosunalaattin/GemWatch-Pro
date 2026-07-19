import { describe, expect, it } from 'vitest';

import { HEALTH_CONTRACT_VERSION, healthResponseSchema } from './health.js';

describe('health contract', () => {
  it('accepts a versioned UTC response', () => {
    const value = healthResponseSchema.parse({
      contractVersion: HEALTH_CONTRACT_VERSION,
      status: 'ok',
      service: 'test',
      version: '0.0.3',
      timestamp: '2026-07-19T12:00:00.000Z',
      correlationId: 'test-correlation',
    });
    expect(value.status).toBe('ok');
  });

  it('rejects a non-UTC timestamp', () => {
    expect(() =>
      healthResponseSchema.parse({
        contractVersion: HEALTH_CONTRACT_VERSION,
        status: 'ok',
        service: 'test',
        version: '0.0.3',
        timestamp: '2026-07-19',
        correlationId: 'test-correlation',
      }),
    ).toThrow();
  });
});
