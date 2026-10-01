'use client'

import { useDraggable } from '@dnd-kit/core'
import { TaskCard, type Task } from '@/entities/task'
import { cn } from '@/shared/lib'
import styles from './draggable-task-card.module.css'

interface DraggableTaskCardProps {
  task: Task
  assigneeName?: string
  onOpen: (taskId: Task['id']) => void
}

export function DraggableTaskCard({ task, assigneeName, onOpen }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      className={cn(styles.item, isDragging && styles.dragging)}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(task.id)}
    >
      <TaskCard task={task} assigneeName={assigneeName} />
    </div>
  )
}
