import { api, API_ENDPOINTS } from '@/shared/api';
import type { CreateTaskDto, MoveTaskDto, Task, UpdateTaskDto } from '../model/task.types';

export const taskApi = {
  getByBoard: (boardId: string) =>
    api.get<Task[]>(API_ENDPOINTS.boards.tasks(boardId)).then((res) => res.data),
  create: (boardId: string, dto: CreateTaskDto) =>
    api.post<Task>(API_ENDPOINTS.boards.tasks(boardId), dto).then((res) => res.data),
  update: (taskId: string, dto: UpdateTaskDto) =>
    api.patch<Task>(API_ENDPOINTS.tasks.byId(taskId), dto).then((res) => res.data),
  move: (taskId: string, dto: MoveTaskDto) =>
    api.patch<Task>(API_ENDPOINTS.tasks.move(taskId), dto).then((res) => res.data),
  remove: (taskId: string) => api.delete<void>(API_ENDPOINTS.tasks.byId(taskId)),
};
