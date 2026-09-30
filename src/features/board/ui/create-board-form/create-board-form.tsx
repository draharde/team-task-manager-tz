'use client';

import { useForm } from 'react-hook-form';
import { boardSchema, type BoardFormValues } from '../../model/board.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoardCreate } from '../../api/board-create.hook';
import { Button, FormItem, Input } from '@/shared/ui';
import styles from './create-board-form.module.css';

export function CreateBoardForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    defaultValues: { title: '' },
  });
  const { mutate: createBoard, isPending } = useBoardCreate();

  const onSubmit = (values: BoardFormValues) => createBoard(values, { onSuccess: () => reset() });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormItem label="Новая задача" error={errors['title']?.message}>
        {(control) => <Input placeholder="Название задачи" {...control} {...register('title')} />}
      </FormItem>

      <Button type="submit" disabled={isPending}>
        Создать доску
      </Button>
    </form>
  );
}
