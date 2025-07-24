import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './CreateSlice' // default import

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
