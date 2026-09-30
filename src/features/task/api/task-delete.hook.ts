'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '@/entities/task';
import { QUERY_KEYS } from '@/shared/api';

export function useTaskDelete(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(boardId) }),
  });
}
