export type Todo = {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt?: string;
};

export type CreateTodo = {
  title: string;
  description: string;
  status: number;
};

export type UpdateTodo = {
  title: string;
  description: string;
  status: number;
};


