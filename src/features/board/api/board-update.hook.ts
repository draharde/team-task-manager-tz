import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateUpdateBoardDto } from '@/entities/board'
import { boardApi } from '@/entities/board'
import { QUERY_KEYS } from '@/shared/api'

interface UpdateBoardProps extends CreateUpdateBoardDto {
  boardId: string
}

export function useBoardUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, title }: UpdateBoardProps) => boardApi.update(boardId, { title }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.boards }),
  })
}
