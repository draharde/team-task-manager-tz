import { HttpResponse } from 'msw';
import type { User } from '@/entities/user';
import { HTTP_STATUS } from '@/shared/api';
import { API_URL } from '@/shared/config';
import { MOCK_TOKEN_PREFIX } from './mock.constants';
import { db, type DbUser } from './mock.db';

export const url = (path: string) => `${API_URL}${path}`;

export const makeToken = (userId: string) => `${MOCK_TOKEN_PREFIX}${userId}`;

export function getAuthUser(request: Request): DbUser | null {
  const bearerPrefix = `Bearer ${MOCK_TOKEN_PREFIX}`;
  const header = request.headers.get('Authorization');
  if (!header?.startsWith(bearerPrefix)) return null;

  const userId = header.slice(bearerPrefix.length);
  return db.get().users.find((user) => user.id === userId) ?? null;
}

export const toPublicUser = (user: DbUser): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarUrl: user.avatarUrl,
});

export const unauthorized = () =>
  HttpResponse.json({ message: 'Требуется авторизация' }, { status: HTTP_STATUS.UNAUTHORIZED });
