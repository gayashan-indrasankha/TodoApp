import { useState } from 'react'
import type { Todo } from './types/todo'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Learn React',
      description: 'Understand components and state',
      status: 0,
    },
    {
      id: 2,
      title: 'Build Todo Frontend',
      description: 'Create UI for the Todo app',
      status: 1,
    },
  ])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(0)
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (title.trim() === '') {
      alert('Title is required')
      return
    }

     if (editingTodoId === null) {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: title,
      description: description,
      status: status,
    }

    setTodos([...todos, newTodo])

  } else {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodoId) {
        return {
          ...todo,
          title: title,
          description: description,
          status: status,
        }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  setTitle('')
  setDescription('')
  setStatus(0)
  setEditingTodoId(null)
}

  function handleDelete(id: number) {
  const updatedTodos = todos.filter((todo) => todo.id !== id)

  setTodos(updatedTodos)
  }

  function handleEdit(todo: Todo) {
  setEditingTodoId(todo.id)
  setTitle(todo.title)
  setDescription(todo.description)
  setStatus(todo.status)
  }

  return (
    <div>
      <h1>Todo App</h1>
      <p>Welcome to the Todo App!</p>

      <h2>Create Todo</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter todo title"
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter todo description"
          />
        </div>

        <br />

        <div>
          <label>Status</label>
          <br />
          <select
            value={status}
            onChange={(event) => setStatus(Number(event.target.value))}
          >
            <option value={0}>Pending</option>
            <option value={1}>Completed</option>
          </select>
        </div>

        <br />

        <button type="submit">
            {editingTodoId === null ? 'Add Todo' : 'Update Todo'}
        </button>
        {editingTodoId !== null && (
          <button
            type="button"
            onClick={() => {
              setTitle('')
              setDescription('')
              setStatus(0)
              setEditingTodoId(null)
            }}
          >
            Cancel
          </button>
        )}            
      </form>

      <hr />

      <h2>Todo List</h2>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Status: {todo.status === 0 ? 'Pending' : 'Completed'}</p>
       
              <button onClick={() => handleEdit(todo)}>
              Edit
              </button>

              <button onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App