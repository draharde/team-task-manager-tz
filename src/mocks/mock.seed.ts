import type { Board } from '@/entities/board';
import type { Task } from '@/entities/task';
import { DEMO_ACCOUNT } from '@/features/auth';
import type { Db, DbUser } from './mock.db';

export function createSeed(): Db {
  const now = new Date().toISOString();

  const demo: DbUser = { id: 'u-demo', name: 'Demo User', ...DEMO_ACCOUNT };
  const anna: DbUser = {
    id: 'u-anna',
    email: 'anna@example.com',
    password: 'anna1234',
    name: 'Анна',
  };

  const board: Board = { id: 'b-1', title: 'Первая доска', ownerId: demo.id, createdAt: now };

  const task = (
    title: string,
    status: Task['status'],
    priority: Task['priority'],
    extra: Partial<Task> = {},
  ): Task => ({
    id: crypto.randomUUID(),
    boardId: board.id,
    title,
    description: '',
    status,
    priority,
    tags: [],
    deadline: null,
    assigneeId: null,
    authorId: demo.id,
    order: 0,
    createdAt: now,
    updatedAt: now,
    ...extra,
  });

  return {
    users: [demo, anna],
    boards: [board],
    tasks: [
      task('Добавить фильтры', 'todo', 'low', { order: 0, authorId: anna.id, assigneeId: demo.id }),
      task('Страница профиля', 'todo', 'medium', { order: 1, tags: ['ui'] }),
      task('Тёмная тема', 'todo', 'low', { order: 2, tags: ['ui'] }),
      task('Сверстать канбан', 'in_progress', 'medium', { assigneeId: anna.id, tags: ['ui'] }),
      task('Настроить проект', 'done', 'high', { tags: ['setup'] }),
    ],
  };
}
