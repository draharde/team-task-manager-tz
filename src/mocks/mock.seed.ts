import type { Board } from '@/entities/board'
import type { Task } from '@/entities/task'
import type { Db, DbUser } from './mock.db'

export function createSeed(): Db {
  const now = new Date().toISOString()

  const demo: DbUser = {
    id: 'u-demo',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo1234',
  }

  const anna: DbUser = {
    id: 'u-anna',
    email: 'anna@example.com',
    password: 'anna1234',
    name: 'Анна',
  }

  const board: Board = { id: 'b-1', title: 'Первая доска', ownerId: demo.id, createdAt: now }

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
    createdAt: now,
    updatedAt: now,
    ...extra,
  })

  return {
    users: [demo, anna],
    boards: [board],
    tasks: [
      task('Добавить фильтры', 'todo', 'high', {
        description: 'Поиск по названию, фильтры по автору, приоритету и тегам.',
        authorId: anna.id,
        assigneeId: demo.id,
        tags: ['frontend'],
        deadline: '2026-10-04',
      }),
      task('Страница профиля', 'todo', 'medium', {
        tags: ['frontend', 'ui'],
        deadline: '2026-10-11',
      }),
      task('Тёмная тема', 'todo', 'low', { tags: ['ui'] }),
      task('Сверстать канбан', 'in_progress', 'high', {
        assigneeId: anna.id,
        tags: ['ui'],
        deadline: '2026-09-29',
      }),
      task('Настроить проект', 'done', 'medium', { tags: ['setup'], assigneeId: demo.id }),
    ],
  }
}
