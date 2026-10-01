import { formatDate } from '@/shared/lib'
import { TASK_PRIORITY_LABELS } from '../../config/task.constants'
import type { TaskPriority } from '../../config/task.constants'
import type { Task } from '../../model/task.types'
import styles from './task-card.module.css'

interface TaskCardProps {
  task: Task
  assigneeName?: string
}

const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  low: styles.low,
  medium: styles.medium,
  high: styles.high,
}

export function TaskCard({ task, assigneeName }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <span className={PRIORITY_CLASSES[task.priority]}>{TASK_PRIORITY_LABELS[task.priority]}</span>

      <h3 className={styles.title}>{task.title}</h3>

      {task.tags.length > 0 && (
        <ul className={styles.tags}>
          {task.tags.map((tag) => (
            <li key={`task-card-tag-key-${tag}`} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      {(task.deadline || assigneeName) && (
        <div className={styles.footer}>
          {task.deadline && <span className={styles.deadline}>{formatDate(task.deadline)}</span>}

          {assigneeName && <span className={styles.assignee}>{assigneeName}</span>}
        </div>
      )}
    </div>
  )
}
