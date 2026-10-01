'use client'

import { useMutation } from '@tanstack/react-query'
import { authApi } from './auth.api'
import { useAuthApplySession } from '../model/auth-apply-session.hook'

export function useAuthLogin() {
  const applySession = useAuthApplySession()
  return useMutation({ mutationFn: authApi.login, onSuccess: applySession })
}
