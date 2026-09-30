'use client';

import { QUERY_KEYS } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { boardApi } from './board.api';

export function useBoardGet() {
  return useQuery({
    queryKey: QUERY_KEYS.boards,
    queryFn: boardApi.getAll,
  });
}
