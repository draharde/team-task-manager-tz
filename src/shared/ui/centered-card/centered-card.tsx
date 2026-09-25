import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './centered-card.module.css';

export function CenteredCard({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={cn('container', styles.card)}>{children}</div>
    </main>
  );
}
