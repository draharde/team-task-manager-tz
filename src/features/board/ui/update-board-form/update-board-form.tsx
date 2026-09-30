'use client';

import type { Board } from '@/entities/board';
import { type BoardFormValues, boardSchema } from '../../model/board.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoardUpdate } from '../../api/board-update.hook';
import { useForm } from 'react-hook-form';
import styles from './update-board-form.module.css';
import { Button, FormItem, Input } from '@/shared/ui';

interface UpdateBoardFormProps {
  board: Board;
  onClose: VoidFunction;
}

export function UpdateBoardForm({ board, onClose }: UpdateBoardFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    values: { title: board.title },
  });
  const { mutate: updateBoard, isPending } = useBoardUpdate();

  const onSubmit = ({ title }: BoardFormValues) => {
    if (!isDirty) onClose();
    updateBoard({ boardId: board.id, title }, { onSuccess: onClose });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormItem label="Название доски" error={errors['title']?.message}>
        {(control) => <Input autoFocus {...control} {...register('title')} />}
      </FormItem>

      <div className={styles.actions}>
        <Button type="submit" disabled={isPending}>
          Сохранить
        </Button>

        <Button variant="secondary" onClick={onClose} disabled={isPending}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
