'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi, useUserSessionStore } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api'

export function useProfileUpdate() {
  const queryClient = useQueryClient()
  const setUser = useUserSessionStore((state) => state.setUser)

  return useMutation({
    mutationFn: userApi.updateCurrent,
    onSuccess: (user) => {
      setUser(user)
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users })
    },
  })
}
