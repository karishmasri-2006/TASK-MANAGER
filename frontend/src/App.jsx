import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Load tasks from browser when app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to browser whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    if (editingId) {
      // Update existing task
      setTasks(tasks.map(task =>
        task.id === editingId? {...task, title: title } : task
      ))
      setEditingId(null)
    } else {
      // Create new task
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date().toLocaleString()
      }
      setTasks([...tasks, newTask])
    }
    setTitle('')
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id? {...task, completed:!task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id!== id))
  }

  const startEdit = (task) => {
    setTitle(task.title)
    setEditingId(task.id)
  }

  const cancelEdit = () => {
    setTitle('')
    setEditingId(null)
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <p className="subtitle">No login needed. Your tasks save automatically.</p>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task..."
            className="task-input"
          />
          <button type="submit" className="btn-primary">
            {editingId? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-secondary">
              Cancel
            </button>
          )}
        </form>

        <div className="task-list">
          {tasks.length === 0? (
            <p className="empty-state">No tasks yet. Add your first one!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed? 'completed' : ''}`}>
                <div className="task-content" onClick={() => toggleComplete(task.id)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <div className="task-actions">
                  <button onClick={() => startEdit(task)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
        </div>
      </div>
    </div>
  )
}

export default App