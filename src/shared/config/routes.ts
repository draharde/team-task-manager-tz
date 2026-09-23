export const ROUTES = {
  login: '/login',
  register: '/register',
  boards: '/boards',
  board: (id: string) => `/boards/${id}`,
  profile: '/profile',
} as const;
