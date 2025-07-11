export interface Task {
  id: number;
  text: string;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TasksAction =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number }
  | { type: 'loaded'; tasks: Task[] };