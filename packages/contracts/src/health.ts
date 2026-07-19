import { z } from 'zod';

export const HEALTH_CONTRACT_VERSION = '1.0.0' as const;

export const dependencyStatusSchema = z.enum(['ok', 'unavailable', 'not_checked']);
export const healthStatusSchema = z.enum(['ok', 'degraded', 'unavailable']);

export const healthResponseSchema = z.object({
  contractVersion: z.literal(HEALTH_CONTRACT_VERSION),
  status: healthStatusSchema,
  service: z.string().min(1),
  version: z.literal('0.0.4'),
  timestamp: z.iso.datetime({ offset: true }),
  correlationId: z.string().min(1),
  dependencies: z
    .object({
      postgres: dependencyStatusSchema,
      redis: dependencyStatusSchema,
    })
    .optional(),
});

export type DependencyStatus = z.infer<typeof dependencyStatusSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type HealthStatus = z.infer<typeof healthStatusSchema>;
