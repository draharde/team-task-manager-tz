import { TASK_STATUSES, type CreateTaskDto, type Task, type TaskStatus } from '@/entities/task'
import { TASK_DEFAULT_PRIORITY, TASK_TAGS_SEPARATOR } from '../config/task.constants'
import type { TaskFormValues } from '../model/task.schema'

export const parseTags = (value: string) => [
  ...new Set(
    value
      .split(TASK_TAGS_SEPARATOR)
      .map((tag) => tag.trim())
      .filter(Boolean),
  ),
]

export const toTaskFormValues = (
  task: Task | null,
  status: TaskStatus = TASK_STATUSES[0],
): TaskFormValues =>
  task
    ? {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline ?? '',
        assigneeId: task.assigneeId ?? '',
        tags: task.tags.join(`${TASK_TAGS_SEPARATOR} `),
      }
    : {
        title: '',
        description: '',
        status,
        priority: TASK_DEFAULT_PRIORITY,
        deadline: '',
        assigneeId: '',
        tags: '',
      }

export const toTaskDto = (values: TaskFormValues): CreateTaskDto => ({
  title: values.title,
  description: values.description,
  status: values.status,
  priority: values.priority,
  tags: parseTags(values.tags),
  deadline: values.deadline || null,
  assigneeId: values.assigneeId || null,
})
