'use client';

import type { Task } from '@/entities/task';
import { useUserList } from '@/entities/user';
import { formatDate } from '@/shared/lib';
import { Modal } from '@/shared/ui';
import { useTaskUpdate } from '../../api/task-update.hook';
import { toTaskDto, toTaskFormValues } from '../../lib/task.lib';
import type { TaskFormValues } from '../../model/task.schema';
import { DeleteTaskButton } from '../delete-task-button';
import { TaskForm } from '../task-form';
import styles from './edit-task-modal.module.css';

interface EditTaskModalProps {
  boardId: string;
  task: Task | null;
  onClose: () => void;
}

export function EditTaskModal({ boardId, task, onClose }: EditTaskModalProps) {
  const { mutate: updateTask, isPending, error, reset } = useTaskUpdate(boardId);
  const { data: users = [] } = useUserList();

  const authorName = users.find((user) => user.id === task?.authorId)?.name;

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) => {
    if (!task) return;
    updateTask({ taskId: task.id, ...toTaskDto(values) }, { onSuccess: handleClose });
  };

  return (
    <Modal title="Редактирование" isOpen={task !== null} onClose={handleClose}>
      {task && (
        <>
          <p className={styles.meta}>
            Создана {formatDate(task.createdAt)}
            {authorName && ` · Автор: ${authorName}`}
          </p>
          <TaskForm
            key={task.id}
            defaultValues={toTaskFormValues(task)}
            submitLabel="Сохранить"
            isPending={isPending}
            error={error?.message}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
          <div className={styles.danger}>
            <DeleteTaskButton task={task} onDeleted={handleClose} />
          </div>
        </>
      )}
    </Modal>
  );
}
