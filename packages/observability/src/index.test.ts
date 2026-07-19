import { describe, expect, it } from 'vitest';

import { createLogger, startTelemetry } from './index.js';

describe('observability foundation', () => {
  it('adds service metadata and redacts secrets', () => {
    const records: string[] = [];
    const logger = createLogger({
      service: 'test',
      environment: 'test',
      version: '0.0.3',
      level: 'info',
      destination: { write: (record) => records.push(record) },
    });
    logger.info({ apiKey: 'must-not-appear', correlationId: 'corr' }, 'event');
    expect(records.join('')).toContain('"service":"test"');
    expect(records.join('')).not.toContain('must-not-appear');
  });

  it('supports a deterministic disabled telemetry mode', async () => {
    const telemetry = await startTelemetry({ enabled: false, serviceName: 'test' });
    expect(telemetry.enabled).toBe(false);
    await telemetry.shutdown();
  });
});
