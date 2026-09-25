import { z } from 'zod';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '../config/auth.constants';

const email = z.email('Некорректный email');
const password = z.string().min(PASSWORD_MIN_LENGTH, `Минимум ${PASSWORD_MIN_LENGTH} символов`);

export const loginSchema = z.object({ email, password });

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_MIN_LENGTH, `Минимум ${NAME_MIN_LENGTH} символа`)
      .max(NAME_MAX_LENGTH, `Максимум ${NAME_MAX_LENGTH} символов`),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
