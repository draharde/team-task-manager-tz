export interface Board {
  id: string
  title: string
  ownerId: string
  createdAt: string
}

export interface CreateUpdateBoardDto {
  title: string
}
