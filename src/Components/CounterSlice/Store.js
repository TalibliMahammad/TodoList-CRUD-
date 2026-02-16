import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './CreateSlice' // default import

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Persist to localStorage (single source of truth: counter.items + counter.darkMode)
let lastPersisted = { todos: null, darkMode: null }
store.subscribe(() => {
  try {
    if (typeof window === 'undefined') return
    const state = store.getState()?.counter
    if (!state) return

    const todos = state.items
    const darkMode = state.darkMode

    const todosJson = JSON.stringify(todos)
    const darkModeJson = JSON.stringify(darkMode)

    if (lastPersisted.todos !== todosJson) {
      window.localStorage.setItem('todos', todosJson)
      lastPersisted.todos = todosJson
    }
    if (lastPersisted.darkMode !== darkModeJson) {
      window.localStorage.setItem('darkMode', darkModeJson)
      lastPersisted.darkMode = darkModeJson
    }
  } catch {
    // ignore persistence errors
  }
})
