'use client'

import { useMutation } from '@tanstack/react-query'
import { authApi } from './auth.api'
import { useAuthApplySession } from '../model/auth-apply-session.hook'
import type { RegisterFormValues } from '../model/auth.schema'

export function useAuthRegister() {
  const applySession = useAuthApplySession()
  return useMutation({
    mutationFn: ({ name, email, password }: RegisterFormValues) =>
      authApi.register({ name, email, password }),
    onSuccess: applySession,
  })
}
