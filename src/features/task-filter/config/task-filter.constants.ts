import type { TaskFilters } from '../model/task-filter.types'

export const EMPTY_TASK_FILTERS: TaskFilters = {
  search: '',
  authorId: '',
  priority: '',
  tags: [],
}
