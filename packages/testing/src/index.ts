export const TEST_DATABASE_PREFIX = 'gemwatch_test_';

export function assertSafeTestDatabaseUrl(databaseUrl: string): void {
  const parsed = new URL(databaseUrl);
  const databaseName = parsed.pathname.slice(1);
  if (!databaseName.startsWith(TEST_DATABASE_PREFIX)) {
    throw new Error(`Test database name must start with ${TEST_DATABASE_PREFIX}`);
  }
  if (/prod|production/i.test(databaseUrl)) {
    throw new Error('Production-like credentials are prohibited in tests');
  }
}

export function deterministicTestEnvironment(overrides: NodeJS.ProcessEnv = {}): NodeJS.ProcessEnv {
  return {
    NODE_ENV: 'test',
    APP_ENV: 'test',
    APP_VERSION: '0.0.3',
    LOG_LEVEL: 'silent',
    API_HOST: '127.0.0.1',
    API_PORT: '3000',
    WEB_PORT: '5173',
    WEB_API_BASE_URL: 'http://127.0.0.1:3000',
    DATABASE_URL: 'postgresql://test:test@127.0.0.1:5432/gemwatch_test_unit',
    REDIS_URL: 'redis://127.0.0.1:6379/15',
    CORS_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
    OTEL_ENABLED: 'false',
    OTEL_SERVICE_NAME: 'gemwatch-test',
    OTEL_EXPORTER_OTLP_ENDPOINT: '',
    LIVE_TRADING_ENABLED: 'false',
    ...overrides,
  };
}
