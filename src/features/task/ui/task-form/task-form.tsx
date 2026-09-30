'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
  TASK_STATUSES,
  TASK_STATUS_LABELS,
} from '@/entities/task';
import { useUserList } from '@/entities/user';
import { Button, FormItem, Input, Select, Textarea } from '@/shared/ui';
import { TASK_TAGS_MAX_COUNT } from '../../config/task.constants';
import { taskFormSchema, type TaskFormValues } from '../../model/task.schema';
import styles from './task-form.module.css';

interface TaskFormProps {
  defaultValues: TaskFormValues;
  submitLabel: string;
  isPending: boolean;
  error?: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

export function TaskForm({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });
  const { data: users = [] } = useUserList();

  const submit = (values: TaskFormValues) => (isDirty ? onSubmit(values) : onCancel());

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <FormItem label="Название" error={errors.title?.message}>
        {(control) => <Input autoFocus {...control} {...register('title')} />}
      </FormItem>

      <FormItem label="Описание" error={errors.description?.message}>
        {(control) => <Textarea {...control} {...register('description')} />}
      </FormItem>

      <div className={styles.row}>
        <FormItem label="Статус" error={errors.status?.message}>
          {(control) => (
            <Select {...control} {...register('status')}>
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {TASK_STATUS_LABELS[status]}
                </option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem label="Приоритет" error={errors.priority?.message}>
          {(control) => (
            <Select {...control} {...register('priority')}>
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {TASK_PRIORITY_LABELS[priority]}
                </option>
              ))}
            </Select>
          )}
        </FormItem>
      </div>

      <div className={styles.row}>
        <FormItem label="Дедлайн" error={errors.deadline?.message}>
          {(control) => <Input type="date" {...control} {...register('deadline')} />}
        </FormItem>

        <FormItem label="Исполнитель" error={errors.assigneeId?.message}>
          {(control) => (
            <Select {...control} {...register('assigneeId')}>
              <option value="">Не назначен</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          )}
        </FormItem>
      </div>

      <FormItem
        label={`Теги через запятую, не больше ${TASK_TAGS_MAX_COUNT}`}
        error={errors.tags?.message}
      >
        {(control) => <Input placeholder="frontend, bug" {...control} {...register('tags')} />}
      </FormItem>

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending}>
          {submitLabel}
        </Button>

        <Button variant="secondary" onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
