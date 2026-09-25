import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib';
import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(styles.button, styles[variant], className)} {...props} />
  );
}
