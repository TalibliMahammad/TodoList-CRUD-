import React, { useState } from 'react'
import Checkbox from './Checkbox'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { checked, deleteTodo } from './CounterSlice/CreateSlice';
import EditModal from './Editmodal';
import { v4 as uuidv4 } from 'uuid';

import EmptyList from './EmptyList';
const TodoList = (filteredTodos) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const { value } = useSelector((state) => state.counter)
  const  todoText = value.some(todo => todo.todoText.trim() !== '');
const filtered = filteredTodos.todos








 


  
  const dispatch = useDispatch();

const openModal = (id) => {
  const selectedTodo = value.find(todo => todo.id === id);
  if (selectedTodo) {
    setEditIndex(id);
    setEditValue(selectedTodo.todoText); 
    setIsModalOpen(true);
  }
};





  return (


    <div className='mt-10 flex justify-center items-center gap-10'>
     
      <div className=' w-[850px] p-2 lg:p-0 '>
        <ul className='flex flex-col gap-10 p-5 md:p-10  bg-violet-700 rounded-lg shadow-lg'>
           {todoText ? (

             filtered.map((todo) => ( 
               <div key={todo.id}  className='flex items-center   flex-col justify-between  gap-5'>
                 <span className='flex w-full  md:text-[12px]   gap-1 md:gap-5 bg-stone-200  justify-between md:justify-evenly items-center p-2 rounded-lg font-bold  text-violet-700'>
                   <span className='flex gap-2 flex-col md:flex-row text-[12px] md:text-[18px]  items-center'>Priority<h2 className=' bg-red-500 p-2  text-[12px] md:text-[18px] rounded-lg text-white'>{todo.priority} </h2></span>
                   <span className='flex gap-2 flex-col md:flex-row text-[12p]  md:text-[18px]  items-center' >DeadLine<h2 className='  bg-red-500 p-2 rounded-lg  text-[12px] md:text-[18px] text-white'>{todo.deadline}</h2></span>
                   <span className='flex gap-2 flex-col md:flex-row text-[12px] md:text-[18px]  items-center'>Who must do it<h2 className='bg-red-500 p-2 md:text-[18px]  text-[12px] rounded-lg text-white'>{todo.assignee}</h2></span>
                 </span>

                 <li className={`  w-full text-white md:text-2xl flex items-center justify-between gap-1 md:gap-5 border-b  border-violet-900 p-2 cursor-pointer ${todo.isChecked ? 'line-through decoration-red-500 ' : ''}`}>
                  <Checkbox onChange={() => dispatch(checked(todo.id))} checked={todo.isChecked} /> {todo.todoText} <span className='flex gap-5 md:gap-10'><MdEdit onClick={() => openModal(todo.id)} className=" cursor-pointer transition-transform duration-300 hover:translate-x-1" /> 
                    <MdDelete onClick={() => dispatch(deleteTodo(todo.id))} className=" cursor-pointer transition-transform duration-300 hover:translate-x-1" />    </span>   </li>
               </div>
               )
   
             )
             
           ): (
            <>
              <div className='flex justify-center items-center'>
                <h2 className='text-white  font-bold text-[2rem] lg:text-[3rem]'>Task List is Empty</h2>
              </div>
             <EmptyList />
            </>
           )}

          <EditModal
            isModalOpen={isModalOpen}
            editValue={editValue}
            setEditValue={setEditValue}
            handleSave={() => {
              dispatch({
                type: 'counter/editTodo',
                payload: { id: editIndex, newText: editValue },
              });
              setIsModalOpen(false);
            }}
            handleCancel={() => setIsModalOpen(false)}
          />
        </ul>
      </div>


    </div>
  )
}

export default TodoList