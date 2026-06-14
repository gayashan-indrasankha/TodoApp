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
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  function openCreateModal() {
    clearForm()
    setIsModalOpen(true)
  }

  function openEditModal(todo: Todo) {
    setEditingTodoId(todo.id)
    setTitle(todo.title)
    setDescription(todo.description || '')
    setStatus(todo.status)
    setIsModalOpen(true)
  }

  function closeModal() {
    clearForm()
    setIsModalOpen(false)
  }

  function clearForm() {
    setTitle('')
    setDescription('')
    setStatus(0)
    setEditingTodoId(null)
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
          closeModal()
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
          closeModal()
          loadTodos()
        })
        .catch((error) => {
          console.error(error)
          alert('Failed to update todo')
        })
    }
  }

  function handleToggleStatus(todo: Todo) {
    const newStatus = todo.status === 0 ? 1 : 0

    updateTodo(todo.id, {
      title: todo.title,
      description: todo.description || '',
      status: newStatus,
    })
      .then(() => {
        loadTodos()
      })
      .catch((error) => {
        console.error(error)
        alert('Failed to update todo status')
      })
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

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.status === 1).length
  const pendingTodos = todos.filter((todo) => todo.status === 0).length

  return (
    <div className="app-page">
      <header className="top-bar">
        <div className="brand">
          <div className="brand-icon">✓</div>
          <div>
            <h1>ToDo App</h1>
            <p>Organize tasks efficiently</p>
          </div>
        </div>

        <button className="add-btn" onClick={openCreateModal}>
          + Add Todo
        </button>
      </header>

      <main className="app-container">
        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Todos</span>
            <strong>{totalTodos}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingTodos}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedTodos}</strong>
          </div>
        </section>

        <section className="todo-section">
          <h2>Todo List</h2>

          {loading && <p className="message">Loading todos...</p>}

          {error !== '' && <p className="error-message">{error}</p>}

          {!loading && todos.length === 0 && (
            <p className="message">No todos found.</p>
          )}

          {!loading && todos.length > 0 && (
            <div className="todo-list">
              {todos.map((todo) => (
                <div key={todo.id} className="todo-row">
                  <input
                    type="checkbox"
                    checked={todo.status === 1}
                    onChange={() => handleToggleStatus(todo)}
                    className="todo-checkbox"
                  />

                  <div className="todo-content">
                    <h3 className={todo.status === 1 ? 'completed-title' : ''}>
                      {todo.title}
                    </h3>

                    <p>{todo.description || 'No description'}</p>

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

                  <div className="todo-actions">
                    <button className="edit-btn" onClick={() => openEditModal(todo)}>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTodoId === null ? 'Add New Todo' : 'Update Todo'}</h2>

              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="todo-form">
              <div className="form-group">
                <label>Todo Title</label>
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
                  placeholder="Optional description"
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

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingTodoId === null ? 'Add Todo' : 'Update Todo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App