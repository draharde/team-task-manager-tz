import { useId, type ReactNode } from 'react';
import styles from './form-item.module.css';

export interface FormItemControlProps {
  id: string;
  'aria-invalid': boolean;
  'aria-describedby': string | undefined;
}

interface FormItemProps {
  label: string;
  error?: string;
  children: (control: FormItemControlProps) => ReactNode;
}

export function FormItem({ label, error, children }: FormItemProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.item}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
