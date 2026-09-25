import { authHandlers } from './auth.handlers';
import { userHandlers } from './users.handlers';

export const handlers = [...authHandlers, ...userHandlers];
