import { boardApi } from '@/entities/board';
import { QUERY_KEYS } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useBoardDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: boardApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.boards }),
  });
}
