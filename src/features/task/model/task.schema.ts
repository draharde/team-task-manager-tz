import { z } from 'zod'
import { TASK_PRIORITIES, TASK_STATUSES } from '@/entities/task'
import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_TAG_MAX_LENGTH,
  TASK_TAGS_MAX_COUNT,
  TASK_TITLE_MAX_LENGTH,
} from '../config/task.constants'
import { parseTags } from '../lib/task.lib'

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Название не может быть пустым')
    .max(TASK_TITLE_MAX_LENGTH, `Максимум ${TASK_TITLE_MAX_LENGTH} символов`),
  description: z
    .string()
    .trim()
    .max(TASK_DESCRIPTION_MAX_LENGTH, `Максимум ${TASK_DESCRIPTION_MAX_LENGTH} символов`),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  deadline: z.string(),
  assigneeId: z.string(),
  tags: z
    .string()
    .refine(
      (v) => parseTags(v).length <= TASK_TAGS_MAX_COUNT,
      `Не больше ${TASK_TAGS_MAX_COUNT} тегов`,
    )
    .refine(
      (value) => parseTags(value).every((tag) => tag.length <= TASK_TAG_MAX_LENGTH),
      `Тег — максимум ${TASK_TAG_MAX_LENGTH} символов`,
    ),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
