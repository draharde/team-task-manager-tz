import { api, API_ENDPOINTS } from '@/shared/api';
import type { AuthResponse, LoginDto, RegisterDto } from '../model/auth.types';

export const authApi = {
  login: (dto: LoginDto) =>
    api.post<AuthResponse>(API_ENDPOINTS.auth.login, dto).then((response) => response.data),
  register: (dto: RegisterDto) =>
    api.post<AuthResponse>(API_ENDPOINTS.auth.register, dto).then((response) => response.data),
};
