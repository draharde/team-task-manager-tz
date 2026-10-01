export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export interface UpdateUserDto {
  name: string
  avatarUrl: string | null
}
