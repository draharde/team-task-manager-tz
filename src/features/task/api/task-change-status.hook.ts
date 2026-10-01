'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, type Task } from '@/entities/task'
import { QUERY_KEYS } from '@/shared/api'

type ChangeStatusVariables = Pick<Task, 'status'> & { taskId: Task['id'] }

export function useTaskChangeStatus(boardId: string) {
  const queryClient = useQueryClient()
  const queryKey = QUERY_KEYS.tasks(boardId)

  return useMutation({
    mutationFn: ({ taskId, status }: ChangeStatusVariables) => taskApi.update(taskId, { status }),
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousTasks = queryClient.getQueryData<Task[]>(queryKey)
      queryClient.setQueryData<Task[]>(queryKey, (tasks) =>
        tasks?.map((task) => (task.id === taskId ? { ...task, status } : task)),
      )
      return { previousTasks }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) queryClient.setQueryData(queryKey, context.previousTasks)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
