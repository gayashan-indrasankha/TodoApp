import type { CreateTodo, Todo, UpdateTodo } from '../types/todo'

const API_BASE_URL = 'https://localhost:7087/api/todos'

export function getTodos(): Promise<Todo[]> {
  return fetch(API_BASE_URL).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch todos')
    }

    return response.json()
  })
}

export function createTodo(todo: CreateTodo): Promise<Todo> {
  return fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create todo')
    }

    return response.json()
  })
}

export function updateTodo(id: number, todo: UpdateTodo): Promise<Todo> {
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to update todo')
    }

    return response.json()
  })
}

export function deleteTodo(id: number): Promise<void> {
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to delete todo')
    }
  })
}