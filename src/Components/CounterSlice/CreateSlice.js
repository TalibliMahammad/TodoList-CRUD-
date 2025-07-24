import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('todos')) || [],
    darkMode:JSON.parse(localStorage.getItem('darkMode')) || false,
  },


  reducers: {
    addToDo: (state, action) => {

      state.value = [...state.value, action.payload];

      
      localStorage.setItem('todos', JSON.stringify(state.value));
    
      
    },
    checked: (state, action) => {
      console.log('action.payload', action.payload);
      state.value = state.value.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, isChecked: !todo.isChecked };
        }
        return todo;
      });

      localStorage.setItem('todos', JSON.stringify(state.value));

    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo, index) => index !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.value));
    },
    editTodo: (state, action) => {
      const { index, newText } = action.payload;
      state.value[index].todoText = newText;
      localStorage.setItem('todos', JSON.stringify(state.value));
    },
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
  
    }



  }
})

export const { addToDo, checked, deleteTodo, editTodo,toggleDarkMode } = counterSlice.actions
export default counterSlice.reducer
