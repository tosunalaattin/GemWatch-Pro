import { readFile } from 'node:fs/promises';

const required = [
  'NODE_ENV',
  'APP_ENV',
  'APP_VERSION',
  'LOG_LEVEL',
  'API_HOST',
  'API_PORT',
  'WEB_PORT',
  'WEB_API_BASE_URL',
  'VITE_APP_VERSION',
  'VITE_APP_ENV',
  'VITE_API_BASE_URL',
  'DATABASE_URL',
  'REDIS_URL',
  'CORS_ALLOWED_ORIGINS',
  'OTEL_ENABLED',
  'OTEL_SERVICE_NAME',
  'OTEL_EXPORTER_OTLP_ENDPOINT',
  'LIVE_TRADING_ENABLED',
];
const text = await readFile('.env.example', 'utf8');
const entries = new Map(
  text
    .split(/\r?\n/u)
    .filter((line) => /^[A-Z][A-Z0-9_]*=/u.test(line))
    .map((line) => {
      const index = line.indexOf('=');
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);
const missing = required.filter((key) => !entries.has(key));
if (missing.length) throw new Error(`Missing environment examples: ${missing.join(', ')}`);
if (entries.get('LIVE_TRADING_ENABLED') !== 'false')
  throw new Error('Live trading must remain false');
const forbiddenBrowser = [...entries.keys()].filter(
  (key) => key.startsWith('VITE_') && /SECRET|TOKEN|KEY|DATABASE|REDIS/u.test(key),
);
if (forbiddenBrowser.length)
  throw new Error(`Unsafe browser variables: ${forbiddenBrowser.join(', ')}`);
console.log('Environment example is complete and safe.');
