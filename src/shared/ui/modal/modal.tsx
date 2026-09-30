'use client';

import { useEffect, type ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './modal.module.css';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  onClose: VoidFunction;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className={cn(styles.overlay, isOpen && styles.open)} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : <div />}

            <button className={styles.close} onClick={onClose}>
              ×
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
