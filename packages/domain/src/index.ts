import { randomUUID } from 'node:crypto';

export type CorrelationId = string & { readonly __brand: 'CorrelationId' };
export type ServiceName = string & { readonly __brand: 'ServiceName' };
export type UtcTimestamp = string & { readonly __brand: 'UtcTimestamp' };

export class GemWatchError extends Error {
  public constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}

export class ConfigurationError extends GemWatchError {}
export class ValidationError extends GemWatchError {}

export function createCorrelationId(): CorrelationId {
  return randomUUID() as CorrelationId;
}

export function parseCorrelationId(value: string): CorrelationId {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(value)) {
    throw new ValidationError('Invalid correlation identifier');
  }
  return value as CorrelationId;
}

export function toUtcTimestamp(date: Date = new Date()): UtcTimestamp {
  const timestamp = date.toISOString();
  if (!timestamp.endsWith('Z')) throw new ValidationError('Timestamp must be UTC');
  return timestamp as UtcTimestamp;
}
