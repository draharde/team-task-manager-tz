import styles from './full-page-spinner.module.css';

export function FullPageSpinner() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Загрузка">
      <span className={styles.spinner} />
    </div>
  );
}
