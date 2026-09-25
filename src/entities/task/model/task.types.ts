import type { TaskPriority, TaskStatus } from '../config/task.constants';

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  deadline: string | null;
  assigneeId: string | null;
  authorId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
