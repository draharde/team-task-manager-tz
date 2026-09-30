'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api';
import { boardApi } from './board.api';

export function useBoardDetails(boardId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.board(boardId),
    queryFn: () => boardApi.getById(boardId),
  });
}
