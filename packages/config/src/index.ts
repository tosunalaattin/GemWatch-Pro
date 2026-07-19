import { z } from 'zod';

const booleanString = z.enum(['true', 'false']).transform((value) => value === 'true');
const optionalUrl = z.union([z.literal(''), z.url()]).transform((value) => value || undefined);

const serverEnvironmentSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    APP_ENV: z.string().min(1).default('local'),
    APP_VERSION: z.literal('0.0.4').default('0.0.4'),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
      .default('info'),
    API_HOST: z.string().min(1).default('127.0.0.1'),
    API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    WEB_PORT: z.coerce.number().int().min(1).max(65535).default(5173),
    WEB_API_BASE_URL: z.url().default('http://127.0.0.1:3000'),
    DATABASE_URL: z.url(),
    REDIS_URL: z.url(),
    CORS_ALLOWED_ORIGINS: z.string().min(1),
    OTEL_ENABLED: booleanString.default(false),
    OTEL_SERVICE_NAME: z.string().min(1).default('gemwatch-api'),
    OTEL_EXPORTER_OTLP_ENDPOINT: optionalUrl.default(''),
    LIVE_TRADING_ENABLED: z.literal('false').default('false'),
  })
  .transform((environment) => ({
    nodeEnv: environment.NODE_ENV,
    appEnv: environment.APP_ENV,
    appVersion: environment.APP_VERSION,
    logLevel: environment.LOG_LEVEL,
    apiHost: environment.API_HOST,
    apiPort: environment.API_PORT,
    webPort: environment.WEB_PORT,
    webApiBaseUrl: environment.WEB_API_BASE_URL,
    databaseUrl: environment.DATABASE_URL,
    redisUrl: environment.REDIS_URL,
    corsAllowedOrigins: environment.CORS_ALLOWED_ORIGINS.split(',').map((value) => value.trim()),
    otelEnabled: environment.OTEL_ENABLED,
    otelServiceName: environment.OTEL_SERVICE_NAME,
    otelExporterOtlpEndpoint: environment.OTEL_EXPORTER_OTLP_ENDPOINT,
    liveTradingEnabled: false as const,
  }));

export type ServerConfig = z.infer<typeof serverEnvironmentSchema>;

export function parseServerConfig(environment: NodeJS.ProcessEnv): ServerConfig {
  return serverEnvironmentSchema.parse(environment);
}
