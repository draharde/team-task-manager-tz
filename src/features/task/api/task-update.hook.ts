'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, type Task, type UpdateTaskDto } from '@/entities/task'
import { QUERY_KEYS } from '@/shared/api'

type UpdateTaskVariables = UpdateTaskDto & { taskId: Task['id'] }

export function useTaskUpdate(boardId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, ...dto }: UpdateTaskVariables) => taskApi.update(taskId, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tasks(boardId) }),
  })
}
