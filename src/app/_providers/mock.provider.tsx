'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { MOCKS_ENABLED } from '@/shared/config';
import { FullPageSpinner } from '@/shared/ui';

let startPromise: Promise<unknown> | null = null;

function startMocks() {
  startPromise ??= import('@/mocks/browser').then(({ worker }) =>
    worker.start({ onUnhandledRequest: 'bypass' }),
  );
  return startPromise;
}

export function MockProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(!MOCKS_ENABLED);

  useEffect(() => {
    if (!MOCKS_ENABLED) return;
    startMocks().then(() => setReady(true));
  }, []);

  if (!ready) return <FullPageSpinner />;
  return children;
}
