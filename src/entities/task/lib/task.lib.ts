import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskPriority,
  type TaskStatus,
} from '../config/task.constants'
import type { Task, TaskColumns } from '../model/task.types'

const byCreatedAt = (a: Task, b: Task) => a.createdAt.localeCompare(b.createdAt)

export const isTaskStatus = (value: unknown): value is TaskStatus =>
  TASK_STATUSES.some((status) => status === value)

export const isTaskPriority = (value: unknown): value is TaskPriority =>
  TASK_PRIORITIES.some((priority) => priority === value)

export const groupTasksByStatus = (tasks: Task[]): TaskColumns => ({
  todo: tasks.filter((task) => task.status === 'todo').sort(byCreatedAt),
  in_progress: tasks.filter((task) => task.status === 'in_progress').sort(byCreatedAt),
  done: tasks.filter((task) => task.status === 'done').sort(byCreatedAt),
})
