export const QUERY_KEYS = {
  users: ['users'],
  boards: ['boards'],
  board: (boardId: string) => ['boards', boardId],
  tasks: (boardId: string) => ['boards', boardId, 'tasks'],
} as const;
