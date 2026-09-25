'use client';

import { useRouter } from 'next/navigation';
import { useUserSessionStore } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import type { AuthResponse } from './auth.types';

export function useAuthApplySession() {
  const setSession = useUserSessionStore((state) => state.setSession);
  const router = useRouter();

  return ({ token, user }: AuthResponse) => {
    setSession(token, user);
    router.replace(ROUTES.boards);
  };
}
