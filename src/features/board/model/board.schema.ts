import { z } from 'zod'
import { BOARD_TITLE_MAX_LENGTH } from '../config/board.constants'

export const boardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Поле должен иметь минимум 1 символ')
    .max(BOARD_TITLE_MAX_LENGTH, `Максимум ${BOARD_TITLE_MAX_LENGTH} символов`),
})

export type BoardFormValues = z.infer<typeof boardSchema>
