import { createLogger } from '@gemwatch/observability';
import { describe, expect, it, vi } from 'vitest';

import { type WorkerDependency, startWorker } from './worker.js';

function dependency(fail = false): WorkerDependency & { close: ReturnType<typeof vi.fn> } {
  return {
    check: async () => {
      if (fail) throw new Error('unavailable');
    },
    close: vi.fn(async () => undefined),
  };
}

const logger = createLogger({
  service: 'test-worker',
  environment: 'test',
  version: '0.0.4',
  level: 'silent',
});

describe('worker shell', () => {
  it('starts, performs no domain jobs, and shuts down dependencies', async () => {
    const target = dependency();
    const worker = await startWorker([target], logger, 5);
    expect(worker.domainJobsProcessed).toBe(0);
    await worker.stop();
    expect(target.close).toHaveBeenCalledOnce();
  });

  it('fails startup when dependency validation fails', async () => {
    await expect(startWorker([dependency(true)], logger)).rejects.toThrow('unavailable');
  });
});
