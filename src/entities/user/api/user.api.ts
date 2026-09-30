import { api, API_ENDPOINTS } from '@/shared/api';
import type { UpdateUserDto, User } from '../model/user.types';

export const userApi = {
  getAll: () => api.get<User[]>(API_ENDPOINTS.users).then((response) => response.data),
  updateCurrent: (dto: UpdateUserDto) =>
    api.patch<User>(API_ENDPOINTS.currentUser, dto).then((response) => response.data),
};
