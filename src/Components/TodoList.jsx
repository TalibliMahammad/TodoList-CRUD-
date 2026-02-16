import React, { useState } from 'react'
import Checkbox from './Checkbox'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { checked, deleteTodo, updateTodo, bulkDelete, bulkToggle, duplicateTodo } from './CounterSlice/CreateSlice';
import EditModal from './Editmodal';

import EmptyList from './EmptyList';

const getDeadlineStatus = (deadline) => {
  if (!deadline) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)
  const diffDays = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return { status: 'overdue', label: 'Overdue', className: 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse' }
  if (diffDays === 0) return { status: 'today', label: 'Due Today', className: 'bg-gradient-to-r from-orange-500 to-red-500' }
  if (diffDays <= 2) return { status: 'soon', label: 'Due Soon', className: 'bg-gradient-to-r from-yellow-500 to-orange-500' }
  return null
}

const TodoList = ({ todos = [], allCount = 0, selectedIds: propSelectedIds, setSelectedIds: setPropSelectedIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ todoText: '', priority: 'Low', deadline: '', assignee: '', notes: '', category: '', tags: [] });
  const [localSelectedIds, setLocalSelectedIds] = useState(new Set());
  const [showNotes, setShowNotes] = useState({});
  const items = useSelector((state) => state.counter.items)
  const hasAnyTodos = (items ?? []).length > 0
  const hasVisibleTodos = (todos ?? []).length > 0

  const selectedIds = propSelectedIds ?? localSelectedIds
  const setSelectedIds = setPropSelectedIds ?? setLocalSelectedIds








 


  
  const dispatch = useDispatch();

const openModal = (id) => {
  const selectedTodo = (items ?? []).find(todo => todo.id === id);
  if (selectedTodo) {
    setEditIndex(id);
    setEditForm({
      todoText: selectedTodo.todoText ?? '',
      priority: selectedTodo.priority ?? 'Low',
      deadline: selectedTodo.deadline ?? '',
      assignee: selectedTodo.assignee ?? '',
      notes: selectedTodo.notes ?? '',
      category: selectedTodo.category ?? '',
      tags: Array.isArray(selectedTodo.tags) ? selectedTodo.tags : [],
    })
    setIsModalOpen(true);
  }
};

const toggleSelect = (id) => {
  setSelectedIds(prev => {
    const next = new Set(prev)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    return next
  })
}

const toggleSelectAll = () => {
  if (selectedIds.size === todos.length) {
    setSelectedIds(new Set())
  } else {
    setSelectedIds(new Set(todos.map(t => t.id)))
  }
}

const toggleNotes = (id) => {
  setShowNotes(prev => ({
    ...prev,
    [id]: !prev[id]
  }))
}





  return (
    <div className='mt-12 flex justify-center items-center gap-10 px-4'>
      <div className='w-full max-w-[900px]'>
        {hasVisibleTodos && todos.length > 0 && (
          <div className='mb-4 flex items-center justify-between p-4 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20'>
            <button
              onClick={toggleSelectAll}
              className='text-white text-sm font-semibold hover:text-purple-200 transition-colors'
            >
              {selectedIds.size === todos.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedIds.size > 0 && (
              <div className='flex items-center gap-3'>
                <span className='text-white/80 text-sm'>
                  {selectedIds.size} selected
                </span>
                <button
                  onClick={() => {
                    dispatch(bulkToggle({ ids: Array.from(selectedIds), checked: true }))
                    setSelectedIds(new Set())
                  }}
                  className='px-3 py-1 text-xs rounded-lg text-white bg-green-500/80 hover:bg-green-500 transition-colors'
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => {
                    dispatch(bulkDelete(Array.from(selectedIds)))
                    setSelectedIds(new Set())
                  }}
                  className='px-3 py-1 text-xs rounded-lg text-white bg-red-500/80 hover:bg-red-500 transition-colors'
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        )}
        <ul className='flex flex-col gap-6 p-6 md:p-8 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10'>
           {hasVisibleTodos ? (
             todos.map((todo, index) => {
               const deadlineStatus = getDeadlineStatus(todo.deadline)
               const isSelected = selectedIds.has(todo.id)
               return ( 
               <div 
                 key={todo.id} 
                 className={`flex items-center flex-col justify-between gap-4 animate-fade-in transition-all duration-300 ${isSelected ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-transparent' : ''}`}
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                 <div className='flex w-full gap-2 md:gap-4 bg-gradient-to-r from-white/30 to-white/10 dark:from-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm justify-between md:justify-evenly items-center p-3 md:p-4 rounded-2xl font-semibold border border-white/20 shadow-lg'>
                   <span className='flex gap-2 flex-col md:flex-row text-xs md:text-base items-center'>
                     <span className='text-gray-700 dark:text-gray-300'>Priority</span>
                     <h2 className={`px-3 py-1.5 text-xs md:text-base rounded-xl text-white font-bold shadow-md ${
                       todo.priority === 'High' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                       todo.priority === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                       'bg-gradient-to-r from-green-500 to-emerald-500'
                     }`}>
                       {todo.priority}
                     </h2>
                   </span>
                   <span className='flex gap-2 flex-col md:flex-row text-xs md:text-base items-center'>
                     <span className='text-gray-700 dark:text-gray-300'>Deadline</span>
                     <div className='flex items-center gap-2'>
                       <h2 className={`px-3 py-1.5 rounded-xl text-xs md:text-base text-white font-bold shadow-md ${
                         deadlineStatus ? deadlineStatus.className : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                       }`}>
                         {todo.deadline}
                       </h2>
                       {deadlineStatus && (
                         <span className={`px-2 py-1 text-xs rounded-lg text-white font-bold ${deadlineStatus.className}`}>
                           {deadlineStatus.label}
                         </span>
                       )}
                     </div>
                   </span>
                   <span className='flex gap-2 flex-col md:flex-row text-xs md:text-base items-center'>
                     <span className='text-gray-700 dark:text-gray-300'>Assignee</span>
                     <h2 className='bg-gradient-to-r from-purple-500 to-pink-600 px-3 py-1.5 rounded-xl text-xs md:text-base text-white font-bold shadow-md'>
                       {todo.assignee}
                     </h2>
                   </span>
                   {todo.category && (
                     <span className='flex gap-2 flex-col md:flex-row text-xs md:text-base items-center'>
                       <span className='text-gray-700 dark:text-gray-300'>Category</span>
                       <h2 className='bg-gradient-to-r from-cyan-500 to-teal-600 px-3 py-1.5 rounded-xl text-xs md:text-base text-white font-bold shadow-md'>
                         {todo.category}
                       </h2>
                     </span>
                   )}
                 </div>
                 {todo.tags && todo.tags.length > 0 && (
                   <div className='flex flex-wrap gap-2 w-full'>
                     {todo.tags.map((tag, tagIdx) => (
                       <span key={tagIdx} className='px-2 py-1 text-xs rounded-lg bg-indigo-500/50 text-white border border-indigo-400/50'>
                         #{tag}
                       </span>
                     ))}
                   </div>
                 )}

                 <li className={`w-full text-white md:text-xl flex flex-col gap-3 p-4 rounded-2xl backdrop-blur-sm bg-white/5 dark:bg-black/10 border-2 transition-all duration-300 cursor-pointer group ${
                   todo.isChecked ? 'line-through decoration-red-400 decoration-2 opacity-60 border-white/10' : 
                   isSelected ? 'border-purple-400 bg-purple-500/20' : 'border-white/10 hover:bg-white/10 dark:hover:bg-black/20'
                 }`}>
                   <div className='flex items-center justify-between gap-3'>
                     <div className='flex items-center gap-3 flex-1'>
                       <Checkbox 
                         onChange={() => toggleSelect(todo.id)} 
                         checked={isSelected}
                         className="mr-2"
                       />
                       <Checkbox onChange={() => dispatch(checked(todo.id))} checked={todo.isChecked} /> 
                       <span className='break-words flex-1'>{todo.todoText}</span>
                     </div>
                     <span className='flex gap-4 md:gap-6'>
                       {todo.notes && (
                         <MdInfoOutline 
                           onClick={() => toggleNotes(todo.id)} 
                           className="cursor-pointer text-2xl md:text-3xl text-green-300 hover:text-green-200 transition-all duration-300 hover:scale-125" 
                         />
                       )}
                       <MdContentCopy 
                         onClick={() => dispatch(duplicateTodo(todo.id))} 
                         className="cursor-pointer text-2xl md:text-3xl text-yellow-300 hover:text-yellow-200 transition-all duration-300 hover:scale-125 hover:rotate-12" 
                         title="Duplicate task"
                       />
                       <MdEdit 
                         onClick={() => openModal(todo.id)} 
                         className="cursor-pointer text-2xl md:text-3xl text-blue-300 hover:text-blue-200 transition-all duration-300 hover:scale-125 hover:rotate-12" 
                       /> 
                       <MdDelete 
                         onClick={() => dispatch(deleteTodo(todo.id))} 
                         className="cursor-pointer text-2xl md:text-3xl text-red-300 hover:text-red-200 transition-all duration-300 hover:scale-125 hover:rotate-12" 
                       />
                     </span>
                   </div>
                   {showNotes[todo.id] && todo.notes && (
                     <div className='mt-2 p-3 bg-white/10 dark:bg-black/20 rounded-xl border border-white/20'>
                       <div className='text-sm text-white/80 font-semibold mb-1'>Notes:</div>
                       <div className='text-sm text-white/70 whitespace-pre-wrap'>{todo.notes}</div>
                     </div>
                   )}
                 </li>
               </div>
               )
             })
           ): (
            <>
              {hasAnyTodos ? (
                <div className='flex justify-center items-center py-10 animate-fade-in'>
                  <h2 className='font-bold text-2xl md:text-4xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                    No matching tasks
                  </h2>
                </div>
              ) : (
                <>
                  <div className='flex justify-center items-center py-12 animate-fade-in'>
                    <h2 className='font-bold text-3xl md:text-5xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                      Task List is Empty
                    </h2>
                  </div>
                  <EmptyList />
                </>
              )}
            </>
           )}

          <EditModal
            isModalOpen={isModalOpen}
            editForm={editForm}
            setEditForm={setEditForm}
            handleSave={() => {
              dispatch(updateTodo({ id: editIndex, changes: editForm }));
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