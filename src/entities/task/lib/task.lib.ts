import { TASK_STATUSES, type TaskStatus } from '../config/task.constants';
import type { Task, TaskColumns } from '../model/task.types';

const byCreatedAt = (a: Task, b: Task) => a.createdAt.localeCompare(b.createdAt);

export const isTaskStatus = (value: unknown): value is TaskStatus =>
  TASK_STATUSES.some((status) => status === value);

export const groupTasksByStatus = (tasks: Task[]): TaskColumns => ({
  todo: tasks.filter((task) => task.status === 'todo').sort(byCreatedAt),
  in_progress: tasks.filter((task) => task.status === 'in_progress').sort(byCreatedAt),
  done: tasks.filter((task) => task.status === 'done').sort(byCreatedAt),
});
