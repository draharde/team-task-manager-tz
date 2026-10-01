import { authHandlers } from './auth.handlers'
import { boardHandlers } from './boards.handlers'
import { taskHandlers } from './tasks.handlers'
import { userHandlers } from './users.handlers'

export const handlers = [...authHandlers, ...userHandlers, ...boardHandlers, ...taskHandlers]
