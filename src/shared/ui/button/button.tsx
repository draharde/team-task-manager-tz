import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import styles from './button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.button, VARIANT_CLASSES[variant], className)}
      {...props}
    />
  )
}
