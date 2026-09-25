'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthApplySession } from '../model/auth-apply-session.hook';
import { authApi } from './auth.api';

export function useAuthLogin() {
  const applySession = useAuthApplySession();
  return useMutation({ mutationFn: authApi.login, onSuccess: applySession });
}
