'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div className={cn(styles.overlay, isOpen && styles.open)} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
