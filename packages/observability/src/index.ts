import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import pino, { type DestinationStream, type Logger } from 'pino';

const REDACT_PATHS = [
  'authorization',
  'cookie',
  'set-cookie',
  'password',
  'secret',
  'token',
  'apiKey',
  'privateKey',
  'seedPhrase',
  'databaseUrl',
  'redisUrl',
  'req.headers.authorization',
  'req.headers.cookie',
];

export interface LoggerOptions {
  readonly service: string;
  readonly environment: string;
  readonly version: string;
  readonly level: string;
  readonly destination?: DestinationStream;
}

export interface TelemetryOptions {
  readonly enabled: boolean;
  readonly serviceName: string;
  readonly endpoint?: string | undefined;
}

export interface TelemetryHandle {
  readonly enabled: boolean;
  shutdown(): Promise<void>;
}

export function createLogger(options: LoggerOptions): Logger {
  return pino(
    {
      level: options.level,
      base: {
        service: options.service,
        environment: options.environment,
        version: options.version,
      },
      redact: { paths: REDACT_PATHS, censor: '[REDACTED]' },
      serializers: {
        err: pino.stdSerializers.err,
        req: (request: { method?: string; url?: string; id?: string }) => ({
          method: request.method,
          url: request.url,
          id: request.id,
        }),
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    options.destination,
  );
}

export async function startTelemetry(options: TelemetryOptions): Promise<TelemetryHandle> {
  if (!options.enabled) {
    return { enabled: false, shutdown: async () => Promise.resolve() };
  }
  const sdk = new NodeSDK({
    serviceName: options.serviceName,
    ...(options.endpoint
      ? { traceExporter: new OTLPTraceExporter({ url: options.endpoint }) }
      : {}),
  });
  sdk.start();
  return { enabled: true, shutdown: async () => sdk.shutdown() };
}
