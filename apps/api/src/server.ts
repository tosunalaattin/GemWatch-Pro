import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { createCorrelationId } from '@gemwatch/domain';
import Fastify, { type FastifyBaseLogger, type FastifyInstance } from 'fastify';

import type { HealthDependencies } from './routes/health.js';
import { registerHealthRoutes } from './routes/health.js';

export interface BuildServerOptions {
  readonly dependencies: HealthDependencies;
  readonly logger: FastifyBaseLogger;
  readonly corsAllowedOrigins: readonly string[];
  readonly production: boolean;
}

export async function buildServer(options: BuildServerOptions): Promise<FastifyInstance> {
  const app = Fastify({
    loggerInstance: options.logger,
    bodyLimit: 1_048_576,
    connectionTimeout: 10_000,
    requestTimeout: 15_000,
    genReqId: (request) => {
      const supplied = request.headers['x-correlation-id'];
      return typeof supplied === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(supplied)
        ? supplied
        : createCorrelationId();
    },
  });
  await app.register(helmet);
  await app.register(cors, {
    origin: (origin, callback) =>
      callback(null, origin === undefined || options.corsAllowedOrigins.includes(origin)),
    credentials: false,
  });
  await app.register(rateLimit, { max: 120, timeWindow: '1 minute' });
  await app.register(swagger, {
    openapi: { info: { title: 'GemWatch Pro API', version: '0.0.4' } },
  });
  if (!options.production) {
    await app.register(swaggerUi, { routePrefix: '/documentation' });
  }
  app.setNotFoundHandler(async (request, reply) =>
    reply.code(404).send({ error: 'Not Found', correlationId: request.id }),
  );
  app.setErrorHandler(async (error, request, reply) => {
    request.log.error({ err: error, event: 'request.failed', correlationId: request.id });
    const candidateStatus =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : 500;
    const statusCode = candidateStatus >= 400 && candidateStatus < 500 ? candidateStatus : 500;
    return reply.code(statusCode).send({
      error: statusCode < 500 ? 'Invalid Request' : 'Internal Server Error',
      correlationId: request.id,
    });
  });
  await registerHealthRoutes(app, options.dependencies);
  return app;
}
