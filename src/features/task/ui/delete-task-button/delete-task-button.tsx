'use client';

import { useState } from 'react';
import type { Task } from '@/entities/task';
import { Button } from '@/shared/ui';
import { useTaskDelete } from '../../api/task-delete.hook';
import styles from './delete-task-button.module.css';

interface DeleteTaskButtonProps {
  task: Task;
  onDeleted: () => void;
}

export function DeleteTaskButton({ task, onDeleted }: DeleteTaskButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const { mutate: deleteTask, isPending, error } = useTaskDelete(task.boardId);

  //TODO: обработать ошибку!
  // eslint-disable-next-line no-console
  console.log(error);

  if (!isConfirming) {
    return (
      <Button variant="secondary" onClick={() => setIsConfirming(true)}>
        Удалить задачу
      </Button>
    );
  }

  return (
    <div className={styles.confirm} role="group" aria-label={`Удаление задачи «${task.title}»`}>
      <p className={styles.question}>Удалить задачу ?</p>

      <div className={styles.actions}>
        <Button
          variant="danger"
          onClick={() => deleteTask(task.id, { onSuccess: onDeleted })}
          disabled={isPending}
        >
          {isPending ? 'Удаляем…' : 'Да, удалить'}
        </Button>

        <Button variant="secondary" onClick={() => setIsConfirming(false)} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </div>
  );
}
