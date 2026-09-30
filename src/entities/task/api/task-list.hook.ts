'use client';

import { QUERY_KEYS } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { taskApi } from './task.api';

export function useTaskList(boardId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.tasks(boardId),
    queryFn: () => taskApi.getByBoard(boardId),
  });
}
