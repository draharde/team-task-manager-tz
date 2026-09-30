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
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDto = Omit<
  Task,
  'id' | 'boardId' | 'authorId' | 'order' | 'createdAt' | 'updatedAt'
>;

export type UpdateTaskDto = Partial<CreateTaskDto>;

export type MoveTaskDto = {
  status: TaskStatus;
  index: number;
};

export type TaskMove = MoveTaskDto & { taskId: Task['id'] };

export type TaskColumns<T = Task> = Record<TaskStatus, T[]>;
