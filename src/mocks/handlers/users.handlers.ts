import { delay, http, HttpResponse } from 'msw';
import { API_ENDPOINTS } from '@/shared/api';
import { SHORT_DELAY_MS } from '../mock.constants';
import { db, type DbUser } from '../mock.db';
import { getAuthUser, toPublicUser, unauthorized, url } from '../mock.utils';
import type { UpdateUserDto } from '@/entities/user';

export const userHandlers = [
  http.get(url(API_ENDPOINTS.users), async ({ request }) => {
    await delay(SHORT_DELAY_MS);
    if (!getAuthUser(request)) return unauthorized();
    return HttpResponse.json(db.get().users.map(toPublicUser));
  }),

  http.patch<never, UpdateUserDto>(url(API_ENDPOINTS.currentUser), async ({ request }) => {
    await delay();
    const user = getAuthUser(request);
    if (!user) return unauthorized();

    const { name, avatarUrl } = await request.json();
    const updatedUser: DbUser = { ...user, name, avatarUrl: avatarUrl ?? undefined };
    db.update((draft) => {
      draft.users = draft.users.map((item) => (item.id === user.id ? updatedUser : item));
    });
    return HttpResponse.json(toPublicUser(updatedUser));
  }),
];
