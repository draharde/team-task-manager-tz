import { BoardPage } from '@/views/board'

interface BoardRouteProps {
  params: Promise<{ boardId: string }>
}

export default async function BoardRoute({ params }: BoardRouteProps) {
  const { boardId } = await params
  return <BoardPage boardId={boardId} />
}
