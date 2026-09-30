export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: '/users',
  boards: {
    list: '/boards',
    byId: (boardId: string) => `/boards/${boardId}`,
    tasks: (boardId: string) => `/boards/${boardId}/tasks`,
  },
  tasks: {
    byId: (taskId: string) => `/tasks/${taskId}`,
    move: (taskId: string) => `/tasks/${taskId}/move`,
  },
} as const;
