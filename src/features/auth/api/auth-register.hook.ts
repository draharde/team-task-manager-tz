'use client';

import { useMutation } from '@tanstack/react-query';
import type { RegisterFormValues } from '../model/auth.schema';
import { useAuthApplySession } from '../model/auth-apply-session.hook';
import { authApi } from './auth.api';

export function useAuthRegister() {
  const applySession = useAuthApplySession();
  return useMutation({
    mutationFn: ({ name, email, password }: RegisterFormValues) =>
      authApi.register({ name, email, password }),
    onSuccess: applySession,
  });
}
