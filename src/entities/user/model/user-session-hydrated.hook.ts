'use client';

import { useSyncExternalStore } from 'react';
import { useUserSessionStore } from './user-session.store';

export const useUserSessionHydrated = () =>
  useSyncExternalStore(
    (onChange) => useUserSessionStore.persist.onFinishHydration(onChange),
    () => useUserSessionStore.persist.hasHydrated(),
    () => false,
  );
