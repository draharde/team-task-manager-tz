import axios from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
}

interface ErrorBody {
  message?: string;
  fieldErrors?: Record<string, string>;
}

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError<ErrorBody>(error)) {
    if (!error.response) return { message: 'Нет соединения с сервером' };
    return {
      message: error.response.data?.message ?? 'Что-то пошло не так',
      status: error.response.status,
      fieldErrors: error.response.data?.fieldErrors,
    };
  }
  return { message: 'Неизвестная ошибка' };
}
