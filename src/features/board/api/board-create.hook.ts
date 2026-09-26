import { boardApi } from '@/entities/board';
import { QUERY_KEYS } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useBoardCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.boards }),
  });
}
