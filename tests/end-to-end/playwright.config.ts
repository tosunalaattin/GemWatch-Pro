import { defineConfig } from '@playwright/test';

const commonEnvironment = {
  NODE_ENV: 'test',
  APP_ENV: 'test',
  APP_VERSION: '0.0.3',
  LOG_LEVEL: 'silent',
  API_HOST: '127.0.0.1',
  API_PORT: '3000',
  WEB_PORT: '5173',
  WEB_API_BASE_URL: 'http://127.0.0.1:3000',
  VITE_APP_VERSION: '0.0.3',
  VITE_APP_ENV: 'test',
  VITE_API_BASE_URL: 'http://127.0.0.1:3000',
  DATABASE_URL: 'postgresql://local:local@127.0.0.1:5432/gemwatch_test_e2e',
  REDIS_URL: 'redis://127.0.0.1:6379/15',
  CORS_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
  OTEL_ENABLED: 'false',
  OTEL_SERVICE_NAME: 'gemwatch-e2e',
  OTEL_EXPORTER_OTLP_ENDPOINT: '',
  LIVE_TRADING_ENABLED: 'false',
};

export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'retain-on-failure' },
  webServer: [
    {
      command: 'pnpm --filter @gemwatch/api dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
      env: commonEnvironment,
    },
    {
      command: 'pnpm --filter @gemwatch/web dev',
      port: 5173,
      reuseExistingServer: !process.env.CI,
      env: commonEnvironment,
    },
  ],
});
