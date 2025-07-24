import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './CreateSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})
