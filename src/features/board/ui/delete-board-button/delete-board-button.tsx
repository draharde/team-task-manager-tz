'use client';

import type { Board } from '@/entities/board';
import { useState } from 'react';
import { useBoardDelete } from '../../api/board-delete.hook';
import { Button } from '@/shared/ui';
import styles from './delete-board-button.module.css';

export function DeleteBoardButton({ id }: Pick<Board, 'id'>) {
  const [isConfirm, setIsConfirm] = useState(false);
  const { mutate: deleteBoard, isPending } = useBoardDelete();

  if (!isConfirm) {
    return (
      <Button variant="secondary" onClick={() => setIsConfirm(true)}>
        Удалить
      </Button>
    );
  }

  // TODO: нужно через модалку сделать !

  return (
    <div className={styles.confirm}>
      <p className={styles.question}>Удалить доску?</p>

      <div className={styles.actions}>
        <Button onClick={() => deleteBoard(id)} disabled={isPending}>
          ok
        </Button>

        <Button variant="secondary" onClick={() => setIsConfirm(false)} disabled={isPending}>
          not ok
        </Button>
      </div>
    </div>
  );
}
