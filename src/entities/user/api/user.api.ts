import { api, API_ENDPOINTS } from '@/shared/api';
import type { User } from '../model/user.types';

export const userApi = {
  getAll: () => api.get<User[]>(API_ENDPOINTS.users).then((response) => response.data),
};
