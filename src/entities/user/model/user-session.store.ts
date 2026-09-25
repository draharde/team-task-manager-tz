'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/shared/config';
import type { User } from './user.types';

interface SessionState {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  setUser: (user: User) => void;
  clear: () => void;
}

export const useUserSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      setUser: (user) => set({ user }),
      clear: () => set({ token: null, user: null }),
    }),
    {
      name: STORAGE_KEYS.session,
      partialize: ({ token, user }) => ({ token, user }),
    },
  ),
);
