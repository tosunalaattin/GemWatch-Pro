interface WorkerLogger {
  info(value: object): void;
}

export interface WorkerDependency {
  check(): Promise<void>;
  close(): Promise<void>;
}

export interface WorkerRuntime {
  readonly stop: () => Promise<void>;
  readonly domainJobsProcessed: 0;
}

export async function startWorker(
  dependencies: readonly WorkerDependency[],
  logger: WorkerLogger,
  heartbeatMs = 30_000,
): Promise<WorkerRuntime> {
  await Promise.all(dependencies.map(async (dependency) => dependency.check()));
  logger.info({ event: 'worker.started', domainJobsProcessed: 0 });
  const heartbeat = setInterval(
    () => logger.info({ event: 'worker.heartbeat', domainJobsProcessed: 0 }),
    heartbeatMs,
  );
  heartbeat.unref();
  let stopped = false;
  return {
    domainJobsProcessed: 0,
    stop: async () => {
      if (stopped) return;
      stopped = true;
      clearInterval(heartbeat);
      await Promise.allSettled(dependencies.map(async (dependency) => dependency.close()));
      logger.info({ event: 'worker.stopped', domainJobsProcessed: 0 });
    },
  };
}
