import styles from './empty.module.css';

const BASE_TITLE = 'Пока нет данных!';

interface EmptyProps {
  title?: string;
}

export function Empty({ title }: EmptyProps) {
  return <div className={styles.container}>{title ?? BASE_TITLE}</div>;
}
