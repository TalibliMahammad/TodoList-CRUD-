import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

function loadJson(key, fallback) {
  try {
    if (typeof window === 'undefined') return fallback
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const initialItems = loadJson('todos', [])
const initialDarkMode = loadJson('darkMode', false)

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    items: Array.isArray(initialItems) ? initialItems : [],
    darkMode: Boolean(initialDarkMode),
  },
  reducers: {
    addToDo: (state, action) => {
      const payload = action.payload || {}
      const todoText = String(payload.todoText ?? '').trim()
      if (!todoText) return

      state.items.push({
        id: uuidv4(),
        todoText,
        priority: payload.priority ?? 'Low',
        deadline: payload.deadline ?? '',
        assignee: payload.assignee ?? '',
        notes: payload.notes ?? '',
        category: payload.category ?? '',
        tags: Array.isArray(payload.tags) ? payload.tags : [],
        isChecked: false,
        createdAt: Date.now(),
      })
    },
    checked: (state, action) => {
      const id = action.payload
      const t = state.items.find((x) => x.id === id)
      if (t) t.isChecked = !t.isChecked
    },
    deleteTodo: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((t) => t.id !== id)
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload || {}
      const t = state.items.find((x) => x.id === id)
      const next = String(newText ?? '').trim()
      if (t && next) t.todoText = next
    },
    updateTodo: (state, action) => {
      const { id, changes } = action.payload || {}
      const t = state.items.find((x) => x.id === id)
      if (!t || !changes) return

      if (changes.todoText !== undefined) {
        const next = String(changes.todoText ?? '').trim()
        if (next) t.todoText = next
      }
      if (changes.priority !== undefined) {
        t.priority = changes.priority
      }
      if (changes.deadline !== undefined) {
        t.deadline = changes.deadline
      }
      if (changes.assignee !== undefined) {
        t.assignee = changes.assignee
      }
      if (changes.notes !== undefined) {
        t.notes = changes.notes
      }
      if (changes.category !== undefined) {
        t.category = changes.category
      }
      if (changes.tags !== undefined) {
        t.tags = Array.isArray(changes.tags) ? changes.tags : []
      }
    },
    duplicateTodo: (state, action) => {
      const id = action.payload
      const original = state.items.find((t) => t.id === id)
      if (original) {
        state.items.push({
          ...original,
          id: uuidv4(),
          todoText: `${original.todoText} (Copy)`,
          isChecked: false,
          createdAt: Date.now(),
        })
      }
    },
    reorderTodos: (state, action) => {
      const { fromIndex, toIndex } = action.payload || {}
      if (typeof fromIndex === 'number' && typeof toIndex === 'number') {
        const [moved] = state.items.splice(fromIndex, 1)
        state.items.splice(toIndex, 0, moved)
      }
    },
    archiveTodo: (state, action) => {
      const id = action.payload
      const t = state.items.find((x) => x.id === id)
      if (t) {
        t.archived = true
        t.archivedAt = Date.now()
      }
    },
    unarchiveTodo: (state, action) => {
      const id = action.payload
      const t = state.items.find((x) => x.id === id)
      if (t) {
        t.archived = false
        delete t.archivedAt
      }
    },
    bulkDelete: (state, action) => {
      const ids = action.payload || []
      if (Array.isArray(ids)) {
        state.items = state.items.filter((t) => !ids.includes(t.id))
      }
    },
    bulkToggle: (state, action) => {
      const { ids, checked } = action.payload || {}
      if (Array.isArray(ids)) {
        state.items.forEach((t) => {
          if (ids.includes(t.id)) {
            t.isChecked = Boolean(checked)
          }
        })
      }
    },
    importTodos: (state, action) => {
      const imported = action.payload || []
      if (Array.isArray(imported)) {
        state.items = imported.map((item) => ({
          ...item,
          id: item.id || uuidv4(),
          createdAt: item.createdAt || Date.now(),
        }))
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.isChecked)
    },
    toggleAll: (state, action) => {
      const shouldCheck = Boolean(action.payload)
      state.items.forEach((t) => {
        t.isChecked = shouldCheck
      })
    },
  },
})

export const { addToDo, checked, deleteTodo, editTodo, updateTodo, toggleDarkMode, clearCompleted, toggleAll, bulkDelete, bulkToggle, importTodos, duplicateTodo, reorderTodos, archiveTodo, unarchiveTodo } =
  counterSlice.actions
export default counterSlice.reducer
