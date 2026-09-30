'use client';

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';
import {
  groupTasksByStatus,
  isTaskStatus,
  TASK_STATUSES,
  TaskCard,
  useTaskList,
  type Task,
  type TaskStatus,
} from '@/entities/task';
import { useUserList } from '@/entities/user';
import { CreateTaskModal, EditTaskModal, useTaskChangeStatus } from '@/features/task';
import {
  EMPTY_TASK_FILTERS,
  filterTasks,
  hasActiveFilters,
  TaskFilterPanel,
  type TaskFilters,
} from '@/features/task-filter';
import {
  MOUSE_ACTIVATION_DISTANCE_PX,
  TOUCH_ACTIVATION_DELAY_MS,
  TOUCH_ACTIVATION_TOLERANCE_PX,
} from '../../config/kanban.constants';
import { getAssigneeName } from '../../lib/kanban.lib';
import { KanbanColumn } from '../kanban-column';
import styles from './kanban-board.module.css';

export function KanbanBoard({ boardId }: { boardId: string }) {
  const { data: tasks, isPending, isError, error } = useTaskList(boardId);
  const { data: users } = useUserList();
  const { mutate: changeStatus } = useTaskChangeStatus(boardId);

  const [draggedTaskId, setDraggedTaskId] = useState<Task['id'] | null>(null);
  const [creatingStatus, setCreatingStatus] = useState<TaskStatus | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<Task['id'] | null>(null);
  const [filters, setFilters] = useState<TaskFilters>(EMPTY_TASK_FILTERS);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: MOUSE_ACTIVATION_DISTANCE_PX } }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: TOUCH_ACTIVATION_DELAY_MS,
        tolerance: TOUCH_ACTIVATION_TOLERANCE_PX,
      },
    }),
  );

  const tasksById = useMemo(() => new Map((tasks ?? []).map((task) => [task.id, task])), [tasks]);
  const userNamesById = useMemo(
    () => new Map((users ?? []).map((user) => [user.id, user.name])),
    [users],
  );
  const visibleTasks = useMemo(() => filterTasks(tasks ?? [], filters), [tasks, filters]);
  const columns = useMemo(() => groupTasksByStatus(visibleTasks), [visibleTasks]);

  const handleDragStart = ({ active }: DragStartEvent) => setDraggedTaskId(String(active.id));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedTaskId(null);
    const task = tasksById.get(String(active.id));
    if (!task || !over || !isTaskStatus(over.id) || task.status === over.id) return;
    changeStatus({ taskId: task.id, status: over.id });
  };

  if (isPending) {
    return <p className={styles.status}>Загружаем задачи…</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const draggedTask = draggedTaskId ? tasksById.get(draggedTaskId) : undefined;
  const editingTask = editingTaskId ? (tasksById.get(editingTaskId) ?? null) : null;

  return (
    <>
      <TaskFilterPanel tasks={tasks} value={filters} onChange={setFilters} />

      {hasActiveFilters(filters) && (
        <p className={styles.status}>
          {visibleTasks.length > 0
            ? `Найдено задач: ${visibleTasks.length} из ${tasks?.length}`
            : 'Ничего не найдено'}
        </p>
      )}

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setDraggedTaskId(null)}
      >
        <div className={styles.board}>
          {TASK_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={columns[status]}
              userNamesById={userNamesById}
              onAddTask={setCreatingStatus}
              onOpenTask={setEditingTaskId}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {draggedTask && (
            <div className={styles.overlay}>
              <TaskCard
                task={draggedTask}
                assigneeName={getAssigneeName(draggedTask, userNamesById)}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CreateTaskModal
        boardId={boardId}
        status={creatingStatus}
        onClose={() => setCreatingStatus(null)}
      />
      <EditTaskModal boardId={boardId} task={editingTask} onClose={() => setEditingTaskId(null)} />
    </>
  );
}
