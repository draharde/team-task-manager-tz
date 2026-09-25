import axios from 'axios';
import { API_URL } from '@/shared/config';
import { toApiError } from './api-error';
import { HTTP_STATUS } from './http-status';

interface ApiOptions {
  getToken: () => string | null;
  onUnauthorized: () => void;
}

export const api = axios.create({ baseURL: API_URL });

let getToken: ApiOptions['getToken'] = () => null;
let onUnauthorized: ApiOptions['onUnauthorized'] = () => {};

export function configureApi(options: ApiOptions) {
  getToken = options.getToken;
  onUnauthorized = options.onUnauthorized;
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = toApiError(error);
    if (apiError.status === HTTP_STATUS.UNAUTHORIZED) onUnauthorized();
    return Promise.reject(apiError);
  },
);
