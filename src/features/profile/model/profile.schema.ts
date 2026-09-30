import { z } from 'zod';
import { USER_NAME_MAX_LENGTH, USER_NAME_MIN_LENGTH } from '@/entities/user';

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(USER_NAME_MIN_LENGTH, `Минимум ${USER_NAME_MIN_LENGTH} символа`)
    .max(USER_NAME_MAX_LENGTH, `Максимум ${USER_NAME_MAX_LENGTH} символов`),
  avatarUrl: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
