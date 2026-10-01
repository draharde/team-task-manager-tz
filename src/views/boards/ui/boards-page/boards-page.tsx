import { CreateBoardForm } from '@/features/board'
import { BoardList } from '@/widgets/board'
import styles from './boards-page.module.css'

export function BoardsPage() {
  return (
    <main className={styles.wrapper}>
      <h1>Мои доски</h1>

      <CreateBoardForm />
      <BoardList />
    </main>
  )
}
