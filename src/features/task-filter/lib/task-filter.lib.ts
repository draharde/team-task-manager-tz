import type { Task } from '@/entities/task';
import type { TaskFilters } from '../model/task-filter.types';

export function filterTasks(tasks: Task[], { search, authorId, priority, tags }: TaskFilters) {
  const query = search.trim().toLowerCase();

  return tasks.filter(
    (task) =>
      (!query || task.title.toLowerCase().includes(query)) &&
      (!authorId || task.authorId === authorId) &&
      (!priority || task.priority === priority) &&
      (tags.length === 0 || tags.every((tag) => task.tags.includes(tag))),
  );
}

export const hasActiveFilters = ({ search, authorId, priority, tags }: TaskFilters) =>
  Boolean(search.trim() || authorId || priority || tags.length);

export const collectTags = (tasks: Task[]) =>
  [...new Set(tasks.flatMap((task) => task.tags))].sort((a, b) => a.localeCompare(b));

export const collectAuthorIds = (tasks: Task[]) => [...new Set(tasks.map((task) => task.authorId))];

export const toggleTag = (tags: string[], tag: string) =>
  tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag];
