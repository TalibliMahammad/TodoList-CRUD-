import React, { useState } from 'react'
import Checkbox from './Checkbox'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { checked, deleteTodo } from './CounterSlice/CreateSlice';
import EditModal from './Editmodal';
const TodoList = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const { value } = useSelector((state) => state.counter)
  const dispatch = useDispatch();

  const openModal = (index) => {
    setEditIndex(index);
    setEditValue(value[index.todoText])
    setIsModalOpen(true);
  }





  return (


    <div className='mt-10 flex justify-center items-center gap-10'>
      <div className=' w-[47%] '>
        <ul className='flex flex-col gap-10 p-10 bg-violet-700 rounded-lg shadow-lg'>
          {value.map((todo, index) => (
            <div key={index}>
              <span className='flex bg-stone-300 gap-2 justify-evenly rounded-lg font-bold  text-violet-700'>
                <span>Priority : {todo.priority}</span>
                <span className='flex gap-2'>DeadLine : <h2>{todo.deadline}</h2></span>
                <span className='flex gap-2'>Who must do it : <h2>{todo.assignee}</h2></span>
              </span>
              <li className={`text-white text-2xl flex items-center justify-between  gap-5 border-b border-violet-900 p-2 cursor-pointer ${todo.isChecked ? 'line-through decoration-red-500 ' : ''}`}> <Checkbox onChange={() => dispatch(checked(index))} checked={todo.isChecked} /> {todo.todoText} <span className='flex gap-10'><MdEdit onClick={() => openModal(index)} className=" cursor-pointer transition-transform duration-300 hover:translate-x-1" /> <MdDelete onClick={() => dispatch(deleteTodo(index))} className=" cursor-pointer transition-transform duration-300 hover:translate-x-1" />    </span>   </li>
            </div>

          ))}

          <EditModal
            isModalOpen={isModalOpen}
            editValue={editValue}
            setEditValue={setEditValue}
            handleSave={() => {
              dispatch({
                type: 'counter/editTodo',
                payload: { index: editIndex, newText: editValue },
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