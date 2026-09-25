'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';
import { useUserSessionStore } from '@/entities/user';
import { configureApi, createQueryClient } from '@/shared/api';
import { MockProvider } from './mock.provider';

configureApi({
  getToken: () => useUserSessionStore.getState().token,
  onUnauthorized: () => useUserSessionStore.getState().clear(),
});

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <MockProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MockProvider>
  );
}
