'use client';

import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import { cn } from '@/shared/lib';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
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
