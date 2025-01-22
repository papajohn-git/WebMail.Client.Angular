export interface Todo {
    id: number;
    task: string;
    isCompleted: boolean;
  }

  export interface CreateTodoDTO {
    task: string;
  }