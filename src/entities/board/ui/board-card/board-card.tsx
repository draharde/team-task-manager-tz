import Link from 'next/link';
import type { ReactNode } from 'react';
import { ROUTES } from '@/shared/config';
import { cn, formatDate } from '@/shared/lib';
import type { Board } from '../../model/board.types';
import styles from './board-card.module.css';

interface BoardCardProps {
  board: Board;
  actions?: ReactNode;
}

export function BoardCard({ board, actions }: BoardCardProps) {
  return (
    <article className={cn('container', styles.card)}>
      <Link href={ROUTES.board(board.id)} className={styles.title}>
        {board.title}
      </Link>

      <p className={styles.date}>Создана {formatDate(board.createdAt)}</p>

      {actions && <div className={styles.actions}>{actions}</div>}
    </article>
  );
}
