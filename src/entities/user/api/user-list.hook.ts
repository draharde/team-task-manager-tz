'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/api'
import { userApi } from './user.api'

export function useUserList() {
  return useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: userApi.getAll,
  })
}
