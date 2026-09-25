'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useUserSessionHydrated, useUserSessionStore } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { FullPageSpinner } from '@/shared/ui';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const hydrated = useUserSessionHydrated();
  const token = useUserSessionStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !token) router.replace(ROUTES.login);
  }, [hydrated, token, router]);

  if (!hydrated || !token) return <FullPageSpinner />;
  return children;
}
