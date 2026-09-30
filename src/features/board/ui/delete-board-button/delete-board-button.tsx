'use client';

import type { Board } from '@/entities/board';
import { useState } from 'react';
import { useBoardDelete } from '../../api/board-delete.hook';
import { Button, ModalDeleteConfirm } from '@/shared/ui';
import styles from './delete-board-button.module.css';

export function DeleteBoardButton({ id }: Pick<Board, 'id'>) {
  const [isConfirm, setIsConfirm] = useState(false);
  const { mutate: deleteBoard, isPending } = useBoardDelete();

  const handleDeleteBoard = () => deleteBoard(id, { onSuccess: () => setIsConfirm(false) });

  return (
    <div className={styles.confirm}>
      <Button variant="secondary" onClick={() => setIsConfirm(true)} disabled={isPending}>
        Удалить
      </Button>

      <ModalDeleteConfirm
        title="Удаление доски"
        isPending={isPending}
        isOpen={isConfirm}
        onCancel={() => setIsConfirm(false)}
        onConfirm={handleDeleteBoard}
      />
    </div>
  );
}
