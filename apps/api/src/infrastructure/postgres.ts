import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { type DependencyProbe, withTimeout } from './dependency-probe.js';

export function createPostgresProbe(databaseUrl: string, timeoutMs = 1_500): DependencyProbe {
  const client = postgres(databaseUrl, { max: 2, connect_timeout: Math.ceil(timeoutMs / 1_000) });
  const database = drizzle(client);
  return {
    async check() {
      await withTimeout(database.execute('select 1'), timeoutMs);
    },
    async close() {
      await client.end({ timeout: 2 });
    },
  };
}
