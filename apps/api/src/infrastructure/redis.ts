import { Redis } from 'ioredis';

import { type DependencyProbe, withTimeout } from './dependency-probe.js';

export function createRedisProbe(redisUrl: string, timeoutMs = 1_500): DependencyProbe {
  const client = new Redis(redisUrl, {
    lazyConnect: true,
    connectTimeout: timeoutMs,
    commandTimeout: timeoutMs,
    maxRetriesPerRequest: 0,
    enableOfflineQueue: false,
  });
  client.on('error', () => undefined);
  return {
    async check() {
      if (client.status === 'wait') await withTimeout(client.connect(), timeoutMs);
      const response = await withTimeout(client.ping(), timeoutMs);
      if (response !== 'PONG') throw new Error('Redis dependency unavailable');
    },
    async close() {
      if (client.status !== 'end') client.disconnect(false);
    },
  };
}
