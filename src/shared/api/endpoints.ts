export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: '/users',
  boards: {
    list: '/boards',
    byId: (boardId: string) => `/boards/${boardId}`,
  },
} as const;
