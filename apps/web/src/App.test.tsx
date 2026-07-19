import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { App } from './App.js';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('platform shell', () => {
  it('renders version, safety state, and a healthy API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              contractVersion: '1.0.0',
              status: 'ok',
              service: 'gemwatch-api',
              version: '0.0.4',
              timestamp: '2026-07-19T12:00:00.000Z',
              correlationId: 'test',
            }),
            { status: 200 },
          ),
      ),
    );
    render(<App />);
    expect(screen.getByText('Development Platform Bootstrap')).toBeInTheDocument();
    expect(screen.getByText('Live trading is disabled and not implemented.')).toBeInTheDocument();
    expect(screen.getByText('0.0.4')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('api-status')).toHaveTextContent('healthy'));
    expect(document.body.textContent).not.toContain('DATABASE_URL');
  });

  it('shows a safe unavailable state', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('secret'))),
    );
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('api-status')).toHaveTextContent('unavailable'));
    expect(document.body.textContent).not.toContain('secret');
  });
});
