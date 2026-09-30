'use client';

import type { ChangeEvent } from 'react';
import { isTaskPriority, TASK_PRIORITIES, TASK_PRIORITY_LABELS, type Task } from '@/entities/task';
import { useUserList } from '@/entities/user';
import { cn } from '@/shared/lib';
import { Button, FormItem, Input, Select } from '@/shared/ui';
import { EMPTY_TASK_FILTERS } from '../../config/task-filter.constants';
import {
  collectAuthorIds,
  collectTags,
  hasActiveFilters,
  toggleTag,
} from '../../lib/task-filter.lib';
import type { TaskFilters } from '../../model/task-filter.types';
import styles from './task-filter-panel.module.css';

interface TaskFilterPanelProps {
  tasks: Task[];
  value: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

export function TaskFilterPanel({ tasks, value, onChange }: TaskFilterPanelProps) {
  const { data: users = [] } = useUserList();

  const authors = users.filter((user) => collectAuthorIds(tasks).includes(user.id));
  const tags = collectTags(tasks);

  const update = (changes: Partial<TaskFilters>) => onChange({ ...value, ...changes });

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value;
    update({ priority: isTaskPriority(priority) ? priority : '' });
  };

  return (
    <div className={styles.panel}>
      <div className={styles.fields}>
        <FormItem label="Поиск по названию">
          {(control) => (
            <Input
              type="search"
              placeholder="Например, «канбан»"
              value={value.search}
              onChange={(event) => update({ search: event.target.value })}
              {...control}
            />
          )}
        </FormItem>

        <FormItem label="Автор">
          {(control) => (
            <Select
              value={value.authorId}
              onChange={(event) => update({ authorId: event.target.value })}
              {...control}
            >
              <option value="">Все</option>
              {authors.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem label="Приоритет">
          {(control) => (
            <Select value={value.priority} onChange={handlePriorityChange} {...control}>
              <option value="">Любой</option>
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {TASK_PRIORITY_LABELS[priority]}
                </option>
              ))}
            </Select>
          )}
        </FormItem>
      </div>

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={cn(styles.tag, value.tags.includes(tag) && styles.selected)}
              aria-pressed={value.tags.includes(tag)}
              onClick={() => update({ tags: toggleTag(value.tags, tag) })}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters(value) && (
        <Button variant="secondary" onClick={() => onChange(EMPTY_TASK_FILTERS)}>
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
}
