import type { Board } from '@/entities/board';
import type { Task } from '@/entities/task';
import type { User } from '@/entities/user';
import { MOCK_DB_STORAGE_KEY } from './mock.constants';
import { createSeed } from './mock.seed';

export type DbUser = User & { password: string };

export interface Db {
  users: DbUser[];
  boards: Board[];
  tasks: Task[];
}

const isDb = (value: unknown): value is Db =>
  typeof value === 'object' &&
  value !== null &&
  'users' in value &&
  'boards' in value &&
  'tasks' in value &&
  Array.isArray(value.users) &&
  Array.isArray(value.boards) &&
  Array.isArray(value.tasks);

function load(): Db {
  try {
    const raw = localStorage.getItem(MOCK_DB_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isDb(parsed) ? parsed : createSeed();
  } catch {
    return createSeed();
  }
}

let data = load();

const persist = () => localStorage.setItem(MOCK_DB_STORAGE_KEY, JSON.stringify(data));

export const db = {
  get: () => data,
  update(mutator: (draft: Db) => void) {
    mutator(data);
    persist();
  },
  reset() {
    data = createSeed();
    persist();
  },
};
