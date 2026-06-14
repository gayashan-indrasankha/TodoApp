import { useEffect, useState, type FormEvent } from 'react'
import type { Todo } from './types/todo'
import { createTodo, deleteTodo, getTodos, updateTodo } from './api/todoApi'
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
        title,
        description,
        status,
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
        title,
        description,
        status,
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
    <div className="app-container">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Manage your daily tasks easily</p>
      </header>

      <section className="todo-form-section">
        <h2>{editingTodoId === null ? 'Create Todo' : 'Update Todo'}</h2>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter todo title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter todo description"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(Number(event.target.value))}
            >
              <option value={0}>Pending</option>
              <option value={1}>Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {editingTodoId === null ? 'Add Todo' : 'Update Todo'}
            </button>

            {editingTodoId !== null && (
              <button type="button" onClick={clearForm} className="secondary-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="todo-list-section">
        <h2>Todo List</h2>

        {loading && <p className="message">Loading todos...</p>}

        {error !== '' && <p className="error-message">{error}</p>}

        {!loading && todos.length === 0 && (
          <p className="message">No todos found.</p>
        )}

        {!loading && todos.length > 0 && (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-card">
                <div className="todo-card-header">
                  <h3>{todo.title}</h3>

                  <span
                    className={
                      todo.status === 0
                        ? 'status-badge pending'
                        : 'status-badge completed'
                    }
                  >
                    {todo.status === 0 ? 'Pending' : 'Completed'}
                  </span>
                </div>

                <p>{todo.description}</p>

                <div className="todo-actions">
                  <button onClick={() => handleEdit(todo)} className="edit-btn">
                    Edit
                  </button>

                  <button onClick={() => handleDelete(todo.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App