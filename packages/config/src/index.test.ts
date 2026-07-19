import { describe, expect, it } from 'vitest';

import { parseServerConfig } from './index.js';

const valid = {
  DATABASE_URL: 'postgresql://local:local@127.0.0.1:5432/local',
  REDIS_URL: 'redis://127.0.0.1:6379/0',
  CORS_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
};

describe('server configuration', () => {
  it('parses safe defaults', () => {
    const config = parseServerConfig(valid);
    expect(config.liveTradingEnabled).toBe(false);
    expect(config.apiPort).toBe(3000);
  });

  it('fails when required connectivity is missing', () => {
    expect(() => parseServerConfig({})).toThrow();
  });

  it('can never enable live trading', () => {
    expect(() => parseServerConfig({ ...valid, LIVE_TRADING_ENABLED: 'true' })).toThrow();
  });
});
