import { CreateBoardForm } from '@/features/board';
import styles from './boards-page.module.css';
import { BoardList } from '@/widgets/board';

export function BoardsPage() {
  return (
    <main className={styles.page}>
      <h1>Мои доски</h1>

      <CreateBoardForm />
      <BoardList />
    </main>
  );
}
