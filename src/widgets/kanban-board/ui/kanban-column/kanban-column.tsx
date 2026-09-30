'use client';

import { useDroppable } from '@dnd-kit/core';
import { TASK_STATUS_LABELS, type Task, type TaskStatus } from '@/entities/task';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { getAssigneeName } from '../../lib/kanban.lib';
import { DraggableTaskCard } from '../draggable-task-card';
import styles from './kanban-column.module.css';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  userNamesById: Map<string, string>;
  onAddTask: (status: TaskStatus) => void;
  onOpenTask: (taskId: Task['id']) => void;
}

export function KanbanColumn({
  status,
  tasks,
  userNamesById,
  onAddTask,
  onOpenTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.title}>{TASK_STATUS_LABELS[status]}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </div>

      <ul ref={setNodeRef} className={cn(styles.list, isOver && styles.over)}>
        {tasks.map((task) => (
          <li key={task.id}>
            <DraggableTaskCard
              task={task}
              assigneeName={getAssigneeName(task, userNamesById)}
              onOpen={onOpenTask}
            />
          </li>
        ))}
      </ul>

      <Button variant="secondary" onClick={() => onAddTask(status)}>
        + Добавить задачу
      </Button>
    </div>
  );
}
