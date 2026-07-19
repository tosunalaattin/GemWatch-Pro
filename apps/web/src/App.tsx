import { useEffect, useState } from 'react';

import { fetchHealth } from './api/health.js';
import './styles.css';

type Connection = 'checking' | 'healthy' | 'unavailable';

export function App() {
  const [connection, setConnection] = useState<Connection>('checking');
  useEffect(() => {
    const controller = new AbortController();
    void fetchHealth(controller.signal)
      .then(() => setConnection('healthy'))
      .catch(() => setConnection('unavailable'));
    return () => controller.abort();
  }, []);

  return (
    <main>
      <p className="eyebrow">GemWatch Pro</p>
      <h1>Development Platform Bootstrap</h1>
      <p>This shell verifies the local platform. No domain feature is implemented.</p>
      <dl>
        <div>
          <dt>API connection</dt>
          <dd data-testid="api-status">{connection}</dd>
        </div>
        <div>
          <dt>Application version</dt>
          <dd>{import.meta.env.VITE_APP_VERSION ?? '0.0.4'}</dd>
        </div>
        <div>
          <dt>Environment</dt>
          <dd>{import.meta.env.VITE_APP_ENV ?? 'local'}</dd>
        </div>
      </dl>
      <p className="warning" role="alert">
        Live trading is disabled and not implemented.
      </p>
    </main>
  );
}
