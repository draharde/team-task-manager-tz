import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import styles from './select.module.css';

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(styles.select, className)} {...props} />;
}
