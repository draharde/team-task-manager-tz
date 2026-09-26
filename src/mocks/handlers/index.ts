import { authHandlers } from './auth.handlers';
import { boardHandlers } from './boards.handlers';
import { userHandlers } from './users.handlers';

export const handlers = [...authHandlers, ...userHandlers, ...boardHandlers];
