import { delay, http, HttpResponse } from 'msw';
import type { LoginDto, RegisterDto } from '@/features/auth';
import { API_ENDPOINTS, HTTP_STATUS } from '@/shared/api';
import { db } from '../mock.db';
import { makeToken, toPublicUser, url } from '../mock.utils';

export const authHandlers = [
  http.post<never, LoginDto>(url(API_ENDPOINTS.auth.login), async ({ request }) => {
    await delay();
    const { email, password } = await request.json();

    const user = db.get().users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json(
        { message: 'Неверный email или пароль' },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }
    return HttpResponse.json({ token: makeToken(user.id), user: toPublicUser(user) });
  }),

  http.post<never, RegisterDto>(url(API_ENDPOINTS.auth.register), async ({ request }) => {
    await delay();
    const dto = await request.json();

    if (db.get().users.some((u) => u.email === dto.email)) {
      return HttpResponse.json(
        { message: 'Пользователь уже существует', fieldErrors: { email: 'Этот email уже занят' } },
        { status: HTTP_STATUS.CONFLICT },
      );
    }

    const user = { id: crypto.randomUUID(), ...dto };
    db.update((draft) => {
      draft.users.push(user);
    });
    return HttpResponse.json(
      { token: makeToken(user.id), user: toPublicUser(user) },
      { status: HTTP_STATUS.CREATED },
    );
  }),
];
