import { delay, http, HttpResponse } from 'msw'
import type { CreateTaskDto, Task, UpdateTaskDto } from '@/entities/task'
import { API_ENDPOINTS, HTTP_STATUS } from '@/shared/api'
import { SHORT_DELAY_MS } from '../mock.constants'
import { db } from '../mock.db'
import { findOwnBoard, findOwnTask, getAuthUser, notFound, unauthorized, url } from '../mock.utils'

interface BoardParams {
  boardId: string
}

interface TaskParams {
  taskId: string
}

const BOARD_TASKS_PATH = url(API_ENDPOINTS.boards.tasks(':boardId'))
const TASK_BY_ID_PATH = url(API_ENDPOINTS.tasks.byId(':taskId'))
const BOARD_NOT_FOUND_MESSAGE = 'Доска не найдена'
const TASK_NOT_FOUND_MESSAGE = 'Задача не найдена'

export const taskHandlers = [
  http.get<BoardParams>(BOARD_TASKS_PATH, async ({ request, params }) => {
    await delay(SHORT_DELAY_MS)
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    if (!findOwnBoard(params.boardId, user.id)) return notFound(BOARD_NOT_FOUND_MESSAGE)

    return HttpResponse.json(db.get().tasks.filter((task) => task.boardId === params.boardId))
  }),

  http.post<BoardParams, CreateTaskDto>(BOARD_TASKS_PATH, async ({ request, params }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    if (!findOwnBoard(params.boardId, user.id)) return notFound(BOARD_NOT_FOUND_MESSAGE)

    const now = new Date().toISOString()
    const task: Task = {
      ...(await request.json()),
      id: crypto.randomUUID(),
      boardId: params.boardId,
      authorId: user.id,
      createdAt: now,
      updatedAt: now,
    }
    db.update((draft) => {
      draft.tasks.push(task)
    })
    return HttpResponse.json(task, { status: HTTP_STATUS.CREATED })
  }),

  http.patch<TaskParams, UpdateTaskDto>(TASK_BY_ID_PATH, async ({ request, params }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    const task = findOwnTask(params.taskId, user.id)
    if (!task) return notFound(TASK_NOT_FOUND_MESSAGE)

    const updatedTask: Task = {
      ...task,
      ...(await request.json()),
      updatedAt: new Date().toISOString(),
    }
    db.update((draft) => {
      draft.tasks = draft.tasks.map((item) => (item.id === task.id ? updatedTask : item))
    })
    return HttpResponse.json(updatedTask)
  }),

  http.delete<TaskParams>(TASK_BY_ID_PATH, async ({ request, params }) => {
    await delay()
    const user = getAuthUser(request)
    if (!user) return unauthorized()
    if (!findOwnTask(params.taskId, user.id)) return notFound(TASK_NOT_FOUND_MESSAGE)

    db.update((draft) => {
      draft.tasks = draft.tasks.filter((item) => item.id !== params.taskId)
    })
    return new HttpResponse(null, { status: HTTP_STATUS.NO_CONTENT })
  }),
]
