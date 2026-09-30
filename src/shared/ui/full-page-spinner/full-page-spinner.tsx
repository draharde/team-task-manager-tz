import styles from './full-page-spinner.module.css';

export function FullPageSpinner() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.spinner} />
    </div>
  );
}
