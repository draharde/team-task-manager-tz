import { useMutation, useQueryClient } from '@tanstack/react-query'
import { boardApi } from '@/entities/board'
import { QUERY_KEYS } from '@/shared/api'

export function useBoardDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: boardApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.boards }),
  })
}
