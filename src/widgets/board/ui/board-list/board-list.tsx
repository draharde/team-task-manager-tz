'use client'

import { useState } from 'react'
import { BoardCard, useBoardGet } from '@/entities/board'
import { DeleteBoardButton, UpdateBoardForm } from '@/features/board'
import { Button, Empty, Loader } from '@/shared/ui'
import styles from './board-list.module.css'

export function BoardList() {
  const { data: boards, isPending, isError, error } = useBoardGet()
  const [editBoardId, setEditBoardId] = useState<string | null>(null)

  if (isPending) return <Loader />
  if (isError) return <p>{error.message}</p>
  if (!boards?.length) return <Empty />

  return (
    <div className={styles.list}>
      {boards.map((board) => (
        <li key={`board-list-item-key-${board.id}`}>
          {editBoardId === board.id ? (
            <div className={styles.editing}>
              <UpdateBoardForm board={board} onClose={() => setEditBoardId(null)} />
            </div>
          ) : (
            <BoardCard
              board={board}
              actions={
                <>
                  <Button variant="secondary" onClick={() => setEditBoardId(board.id)}>
                    Редактировать
                  </Button>

                  <DeleteBoardButton id={board.id} />
                </>
              }
            />
          )}
        </li>
      ))}
    </div>
  )
}
