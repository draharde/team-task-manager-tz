'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/shared/api'
import { boardApi } from './board.api'

export function useBoardGet() {
  return useQuery({
    queryKey: QUERY_KEYS.boards,
    queryFn: boardApi.getAll,
  })
}
