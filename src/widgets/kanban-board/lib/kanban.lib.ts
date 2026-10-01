import type { Task } from '@/entities/task'

export const getAssigneeName = (task: Task, userNamesById: Map<string, string>) =>
  task.assigneeId ? userNamesById.get(task.assigneeId) : undefined
