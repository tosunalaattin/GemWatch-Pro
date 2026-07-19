import {
  HEALTH_CONTRACT_VERSION,
  type DependencyStatus,
  type HealthResponse,
} from '@gemwatch/contracts';
import type { FastifyInstance } from 'fastify';

import type { DependencyProbe } from '../infrastructure/dependency-probe.js';
import { LIVENESS_ROUTE } from './liveness.js';
import { READINESS_ROUTE } from './readiness.js';

export interface HealthDependencies {
  readonly postgres: DependencyProbe;
  readonly redis: DependencyProbe;
}

const responseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['contractVersion', 'status', 'service', 'version', 'timestamp', 'correlationId'],
  properties: {
    contractVersion: { type: 'string', const: HEALTH_CONTRACT_VERSION },
    status: { type: 'string', enum: ['ok', 'degraded', 'unavailable'] },
    service: { type: 'string' },
    version: { type: 'string', const: '0.0.4' },
    timestamp: { type: 'string', format: 'date-time' },
    correlationId: { type: 'string' },
    dependencies: {
      type: 'object',
      additionalProperties: false,
      required: ['postgres', 'redis'],
      properties: {
        postgres: { type: 'string', enum: ['ok', 'unavailable', 'not_checked'] },
        redis: { type: 'string', enum: ['ok', 'unavailable', 'not_checked'] },
      },
    },
  },
} as const;

function baseResponse(correlationId: string): Omit<HealthResponse, 'status'> {
  return {
    contractVersion: HEALTH_CONTRACT_VERSION,
    service: 'gemwatch-api',
    version: '0.0.4',
    timestamp: new Date().toISOString(),
    correlationId,
  };
}

async function statusOf(probe: DependencyProbe): Promise<DependencyStatus> {
  try {
    await probe.check();
    return 'ok';
  } catch {
    return 'unavailable';
  }
}

export async function registerHealthRoutes(
  app: FastifyInstance,
  dependencies: HealthDependencies,
): Promise<void> {
  app.get('/health', { schema: { response: { 200: responseSchema } } }, async (request) => ({
    ...baseResponse(request.id),
    status: 'ok' as const,
  }));

  app.get(LIVENESS_ROUTE, { schema: { response: { 200: responseSchema } } }, async (request) => ({
    ...baseResponse(request.id),
    status: 'ok' as const,
  }));

  app.get(
    READINESS_ROUTE,
    { schema: { response: { 200: responseSchema, 503: responseSchema } } },
    async (request, reply) => {
      const [postgres, redis] = await Promise.all([
        statusOf(dependencies.postgres),
        statusOf(dependencies.redis),
      ]);
      const ready = postgres === 'ok' && redis === 'ok';
      const response: HealthResponse = {
        ...baseResponse(request.id),
        status: ready ? 'ok' : 'degraded',
        dependencies: { postgres, redis },
      };
      return reply.code(ready ? 200 : 503).send(response);
    },
  );
}
