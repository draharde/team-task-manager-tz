import { formatDate } from '@/shared/lib';
import type { Task } from '../../model/task.types';
import styles from './task-card.module.css';
import { TASK_PRIORITY_LABELS } from '../../config/task.constants';

interface TaskCardProps {
  task: Task;
  assigneeName?: string;
}

export function TaskCard({ task, assigneeName }: TaskCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles[task.priority]}>{TASK_PRIORITY_LABELS[task.priority]}</span>

      <h3 className={styles.title}>{task.title}</h3>

      {task.tags.length > 0 && (
        <ul className={styles.tags}>
          {task.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
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
  );
}
