import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'
import styles from './textarea.module.css'

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(styles.textarea, className)} {...props} />
}
