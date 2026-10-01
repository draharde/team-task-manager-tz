import { delay, http, HttpResponse } from 'msw'
import type { Board, CreateUpdateBoardDto } from '@/entities/board'
import { API_ENDPOINTS, HTTP_STATUS } from '@/shared/api'
import { SHORT_DELAY_MS } from '../mock.constants'
import { db } from '../mock.db'
import { findOwnBoard, getAuthUser, notFound, unauthorized, url } from '../mock.utils'

interface BoardParams {
  boardId: string
}

const BOARD_BY_ID_PATH = url(API_ENDPOINTS.boards.byId(':boardId'))
const BOARD_NOT_FOUND_MESSAGE = 'Доска не найдена'

const byNewest = (a: Board, b: Board) => b.createdAt.localeCompare(a.createdAt)

export const boardHandlers = [
  http.get(url(API_ENDPOINTS.boards.list), async ({ request }) => {
    await delay(SHORT_DELAY_MS)
    const user = getAuthUser(request)
    if (!user) return unauthorized()

    const boards = db
      .get()
      .boards.filter((board) => board.ownerId === user.id)
      .sort(byNewest)
    return HttpResponse.json(boards)
  }),

  http.post<never, CreateUpdateBoardDto>(url(API_ENDPOINTS.boards.list), async ({ request }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()

    const { title } = await request.json()
    const board: Board = {
      id: crypto.randomUUID(),
      title,
      ownerId: user.id,
      createdAt: new Date().toISOString(),
    }
    db.update((draft) => {
      draft.boards.push(board)
    })
    return HttpResponse.json(board, { status: HTTP_STATUS.CREATED })
  }),

  http.get<BoardParams>(BOARD_BY_ID_PATH, async ({ request, params }) => {
    await delay(SHORT_DELAY_MS)
    const user = getAuthUser(request)
    if (!user) return unauthorized()

    const board = findOwnBoard(params.boardId, user.id)
    return board ? HttpResponse.json(board) : notFound(BOARD_NOT_FOUND_MESSAGE)
  }),

  http.patch<BoardParams, CreateUpdateBoardDto>(BOARD_BY_ID_PATH, async ({ request, params }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    if (!findOwnBoard(params.boardId, user.id)) return notFound(BOARD_NOT_FOUND_MESSAGE)

    const { title } = await request.json()
    db.update((draft) => {
      const board = draft.boards.find(({ id }) => id === params.boardId)
      if (board) board.title = title
    })
    return HttpResponse.json(findOwnBoard(params.boardId, user.id))
  }),

  http.delete<BoardParams>(BOARD_BY_ID_PATH, async ({ request, params }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    if (!findOwnBoard(params.boardId, user.id)) return notFound(BOARD_NOT_FOUND_MESSAGE)

    db.update((draft) => {
      draft.boards = draft.boards.filter(({ id }) => id !== params.boardId)
      draft.tasks = draft.tasks.filter(({ boardId }) => boardId !== params.boardId)
    })
    return new HttpResponse(null, { status: HTTP_STATUS.NO_CONTENT })
  }),
]
