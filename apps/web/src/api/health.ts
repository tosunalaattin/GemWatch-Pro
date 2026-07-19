import { healthResponseSchema, type HealthResponse } from '@gemwatch/contracts';

function validatedBaseUrl(value: string | undefined): string {
  const url = new URL(value ?? 'http://127.0.0.1:3000');
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Invalid public API base URL');
  }
  return url.origin;
}

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch(`${validatedBaseUrl(import.meta.env.VITE_API_BASE_URL)}/health`, {
    ...(signal ? { signal } : {}),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error('API unavailable');
  return healthResponseSchema.parse(await response.json());
}
