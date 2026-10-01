'use client'

import Link from 'next/link'
import { useBoardDetails } from '@/entities/board'
import { ROUTES } from '@/shared/config'
import { Empty, Loader } from '@/shared/ui'
import { KanbanBoard } from '@/widgets/kanban-board'
import styles from './board-page.module.css'

export function BoardPage({ boardId }: { boardId: string }) {
  const { data: board, isPending } = useBoardDetails(boardId)

  return (
    <main className={styles.wrapper}>
      <Link href={ROUTES.boards} className={styles.back}>
        ← Все доски
      </Link>

      {isPending && <Loader />}

      {board ? (
        <>
          <h1 className={styles.title}>{board.title}</h1>
          <KanbanBoard boardId={boardId} />
        </>
      ) : (
        <Empty />
      )}
    </main>
  )
}
