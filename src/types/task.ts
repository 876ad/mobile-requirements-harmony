export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  groupId?: string;
}

export interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
}