import { api, API_ENDPOINTS } from '@/shared/api';
import type { Board, CreateUpdateBoardDto } from '../model/board.types';

export const boardApi = {
  getAll: () => api.get<Board[]>(API_ENDPOINTS.boards.list).then((res) => res.data),
  create: (dto: CreateUpdateBoardDto) =>
    api.post<Board>(API_ENDPOINTS.boards.list, dto).then((res) => res.data),
  update: (boardId: string, dto: CreateUpdateBoardDto) =>
    api.patch<Board>(API_ENDPOINTS.boards.byId(boardId), dto).then((res) => res.data),
  remove: (boardId: string) =>
    api.delete<void>(API_ENDPOINTS.boards.byId(boardId)).then((res) => res.data),
};
