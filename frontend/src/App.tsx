import { useEffect, useState, type FormEvent } from 'react'
import type { Todo } from './types/todo'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(0)

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodos()
  }, [])

  function loadTodos() {
    setLoading(true)
    setError('')

    getTodos()
      .then((data) => {
        setTodos(data)
      })
      .catch((error) => {
        console.error(error)
        setError('Failed to load todos from backend')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (title.trim() === '') {
      alert('Title is required')
      return
    }

    if (editingTodoId === null) {
      createTodo({
      title: title,
      description: description,
      status: status,
    })
      .then(() => {
        clearForm()
        loadTodos()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to create todo')
      })
    } else {
    updateTodo(editingTodoId, {
      title: title,
      description: description,
      status: status,
    })
      .then(() => {
        clearForm()
        loadTodos()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to update todo')
      })
      }
  }
  function handleEdit(todo: Todo) {
    setEditingTodoId(todo.id)
    setTitle(todo.title)
    setDescription(todo.description)
    setStatus(todo.status)
  }

  function handleDelete(id: number) {
    const confirmed = confirm('Are you sure you want to delete this todo?')

    if (!confirmed) {
      return
    }

    deleteTodo(id)
      .then(() => {
        loadTodos()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to delete todo')
      })
  }

  function clearForm() {
    setTitle('')
    setDescription('')
    setStatus(0)
    setEditingTodoId(null)
  }

  return (
    <div>
      <h1>Todo App</h1>
      <p>Welcome to the Todo App!</p>

      <h2>{editingTodoId === null ? 'Create Todo' : 'Update Todo'}</h2>

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
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Todo List</h2>

      {loading && <p>Loading todos...</p>}

      {error !== '' && <p>{error}</p>}

      {!loading && todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Status: {todo.status === 0 ? 'Pending' : 'Completed'}</p>

              <button onClick={() => handleEdit(todo)}>Edit</button>

              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
