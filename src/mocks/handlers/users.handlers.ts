import { delay, http, HttpResponse } from 'msw';
import { API_ENDPOINTS } from '@/shared/api';
import { SHORT_DELAY_MS } from '../mock.constants';
import { db } from '../mock.db';
import { getAuthUser, toPublicUser, unauthorized, url } from '../mock.utils';

export const userHandlers = [
  http.get(url(API_ENDPOINTS.users), async ({ request }) => {
    await delay(SHORT_DELAY_MS);
    if (!getAuthUser(request)) return unauthorized();
    return HttpResponse.json(db.get().users.map(toPublicUser));
  }),
];
