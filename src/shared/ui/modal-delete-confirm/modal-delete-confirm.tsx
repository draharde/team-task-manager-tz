'use client';

import { Button } from '../button';
import { Modal } from '../modal/modal';
import styles from './modal-delete-confirm.module.css';

interface ModalDeleteConfirmProps {
  isPending?: boolean;
  isOpen: boolean;
  title?: string;
  onCancel: VoidFunction;
  onConfirm: VoidFunction;
}

export function ModalDeleteConfirm({
  isPending = false,
  isOpen,
  title,
  onCancel,
  onConfirm,
}: ModalDeleteConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Вы подтверждаете удаление ?</h3>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} disabled={isPending}>
            Отменить
          </Button>

          <Button variant="danger" onClick={onConfirm} disabled={isPending}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
