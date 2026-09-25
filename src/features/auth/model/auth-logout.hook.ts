'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useUserSessionStore } from '@/entities/user';

export function useAuthLogout() {
  const clear = useUserSessionStore((state) => state.clear);
  const queryClient = useQueryClient();

  return () => {
    clear();
    queryClient.clear();
  };
}
