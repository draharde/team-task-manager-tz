export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  boards: '/boards',
  board: (boardId: string) => `/boards/${boardId}`,
  profile: '/profile',
} as const
