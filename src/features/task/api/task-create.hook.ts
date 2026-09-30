'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi, type CreateTaskDto } from '@/entities/task';
import { QUERY_KEYS } from '@/shared/api';

export function useTaskCreate(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTaskDto) => taskApi.create(boardId, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(boardId) }),
  });
}
