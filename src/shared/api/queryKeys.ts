export const queryKeys = {
  boards: ['boards'] as const,
  board: (id: string) => ['boards', id] as const,
  tasks: (boardId: string) => ['boards', boardId, 'tasks'] as const,
  me: ['me'] as const,
} as const;
