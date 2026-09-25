import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import styles from './input.module.css';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(styles.input, className)} {...props} />;
}
