import styles from './loader.module.css'

export function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
