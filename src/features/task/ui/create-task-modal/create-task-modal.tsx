'use client';

import type { TaskStatus } from '@/entities/task';
import { Modal } from '@/shared/ui';
import { useTaskCreate } from '../../api/task-create.hook';
import { toTaskDto, toTaskFormValues } from '../../lib/task.lib';
import type { TaskFormValues } from '../../model/task.schema';
import { TaskForm } from '../task-form';

interface CreateTaskModalProps {
  boardId: string;
  status: TaskStatus | null;
  onClose: () => void;
}

export function CreateTaskModal({ boardId, status, onClose }: CreateTaskModalProps) {
  const { mutate: createTask, isPending, error, reset } = useTaskCreate(boardId);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (values: TaskFormValues) =>
    createTask(toTaskDto(values), { onSuccess: handleClose });

  return (
    <Modal title="Новая задача" isOpen={status !== null} onClose={handleClose}>
      {status && (
        <TaskForm
          defaultValues={toTaskFormValues(null, status)}
          submitLabel="Создать задачу"
          isPending={isPending}
          error={error?.message}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      )}
    </Modal>
  );
}
