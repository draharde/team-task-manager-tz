import { QueryClient } from '@tanstack/react-query';
import { HTTP_STATUS } from './http-status';

const STALE_TIME_MS = 30_000;
const MAX_RETRIES = 2;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        retry: (failureCount, error) =>
          (error.status ?? HTTP_STATUS.INTERNAL_SERVER_ERROR) >=
            HTTP_STATUS.INTERNAL_SERVER_ERROR && failureCount < MAX_RETRIES,
      },
    },
  });
}
