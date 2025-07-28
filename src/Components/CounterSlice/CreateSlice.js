import { createSlice } from '@reduxjs/toolkit'
import { v4 as uudv4 } from 'uuid'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('todos')) || [],
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
    todos: JSON.parse(localStorage.getItem('todos')) || []
  },


  reducers: {
    addToDo: (state, action) => {
      const newTodo = { id: uudv4(), ...action.payload };
      state.value = [...state.value, newTodo];
      localStorage.setItem('todos', JSON.stringify(state.value));
      console.log(...state.value);

    },
    checked: (state, action) => {

      state.value = state.value.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isChecked: !todo.isChecked, id: todo.id };
        }
        return todo;
      });

      localStorage.setItem('todos', JSON.stringify(state.value));

    },
    deleteTodo: (state, action) => {
      console.log(action.payload);

      state.value = state.value.filter((todo) => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.value));
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todoEdit = state.value.find(todo => todo.id === id)
      console.log(todoEdit);

      if (todoEdit) {
        todoEdit.todoText = newText
      }


      localStorage.setItem('todos', JSON.stringify(state.value));
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },

    findTodo: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      console.log(action.payload);

      console.log(...state.value);
      if (searchTerm.trim() === "") {
        state.value = [...state.todos];
      } else {
        state.value = state.todos.filter((todo) => todo.todoText.toLowerCase().includes(searchTerm))
      }

    }



  }
})

export const { addToDo, checked, deleteTodo, editTodo, toggleDarkMode, findTodo } = counterSlice.actions
export default counterSlice.reducer
