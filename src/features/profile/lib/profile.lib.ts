import type { UpdateUserDto } from '@/entities/user'
import {
  AVATAR_ACCEPTED_TYPES,
  AVATAR_MAX_SIZE_BYTES,
  AVATAR_MAX_SIZE_KB,
} from '../config/profile.constants'
import type { ProfileFormValues } from '../model/profile.schema'

export function validateAvatarFile(file: File): string | null {
  if (!AVATAR_ACCEPTED_TYPES.includes(file.type))
    return 'Нужна картинка в формате PNG, JPEG или WebP'
  if (file.size > AVATAR_MAX_SIZE_BYTES) return `Файл больше ${AVATAR_MAX_SIZE_KB} КБ`
  return null
}

export const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => (typeof reader.result === 'string' ? resolve(reader.result) : reject())
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const toUpdateUserDto = (values: ProfileFormValues): UpdateUserDto => ({
  name: values.name,
  avatarUrl: values.avatarUrl || null,
})
