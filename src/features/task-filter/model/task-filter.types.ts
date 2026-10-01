import type { TaskPriority } from '@/entities/task'

export interface TaskFilters {
  search: string
  authorId: string
  priority: TaskPriority | ''
  tags: string[]
}
