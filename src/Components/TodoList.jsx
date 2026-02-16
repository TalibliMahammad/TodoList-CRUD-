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
    <div className='max-w-3xl mx-auto mt-8'>
      {hasVisibleTodos && todos.length > 0 && (
        <div className='mb-3 flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20'>
          <button
            onClick={toggleSelectAll}
            className='text-sm font-medium text-white/90 hover:text-white transition-colors'
          >
            {selectedIds.size === todos.length ? 'Ləğv et' : 'Hamısını seç'}
          </button>
          {selectedIds.size > 0 && (
            <div className='flex items-center gap-2'>
              <span className='text-white/70 text-sm'>{selectedIds.size} seçilib</span>
              <button
                onClick={() => {
                  dispatch(bulkToggle({ ids: Array.from(selectedIds), checked: true }))
                  setSelectedIds(new Set())
                }}
                className='px-3 py-1.5 text-xs rounded-lg bg-green-500/80 hover:bg-green-500 text-white font-medium transition-colors'
              >
                Tamamla
              </button>
              <button
                onClick={() => {
                  dispatch(bulkDelete(Array.from(selectedIds)))
                  setSelectedIds(new Set())
                }}
                className='px-3 py-1.5 text-xs rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium transition-colors'
              >
                Sil
              </button>
            </div>
          )}
        </div>
      )}
        <ul className='flex flex-col gap-4 p-4 md:p-6 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 backdrop-blur-sm'>
           {hasVisibleTodos ? (
             todos.map((todo, index) => {
               const deadlineStatus = getDeadlineStatus(todo.deadline)
               const isSelected = selectedIds.has(todo.id)
               return (
               <div
                 key={todo.id}
                 className={`rounded-xl border transition-all duration-200 animate-fade-in ${isSelected ? 'ring-2 ring-purple-400/80 bg-purple-500/10 border-purple-400/50' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                 style={{ animationDelay: `${index * 0.05}s` }}
               >
                 {/* Metadata row - compact chips */}
                 <div className='flex flex-wrap gap-2 p-3 border-b border-white/10'>
                   <span className={`px-2.5 py-1 text-xs font-medium rounded-lg text-white ${
                     todo.priority === 'High' ? 'bg-red-500/70' :
                     todo.priority === 'Medium' ? 'bg-amber-500/70' : 'bg-emerald-500/70'
                   }`}>
                     {todo.priority}
                   </span>
                   {todo.deadline && (
                     <span className={`px-2.5 py-1 text-xs font-medium rounded-lg text-white ${deadlineStatus ? deadlineStatus.className : 'bg-blue-500/70'}`}>
                       {todo.deadline}{deadlineStatus && ` • ${deadlineStatus.label}`}
                     </span>
                   )}
                   {todo.assignee && (
                     <span className='px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/70 text-white'>
                       {todo.assignee}
                     </span>
                   )}
                   {todo.category && (
                     <span className='px-2.5 py-1 text-xs font-medium rounded-lg bg-cyan-500/70 text-white'>
                       {todo.category}
                     </span>
                   )}
                   {todo.tags?.length > 0 && todo.tags.map((tag, tagIdx) => (
                     <span key={tagIdx} className='px-2 py-1 text-xs rounded-lg bg-white/20 text-white/90'>
                       #{tag}
                     </span>
                   ))}
                 </div>

                 <li className={`w-full flex flex-col gap-3 p-4 cursor-pointer ${
                   todo.isChecked ? 'line-through decoration-2 decoration-red-400/60 opacity-70' : ''
                 }`}>
                   <div className='flex items-center justify-between gap-4'>
                     <div className='flex items-center gap-3 flex-1 min-w-0'>
                       <Checkbox onChange={() => toggleSelect(todo.id)} checked={isSelected} />
                       <Checkbox onChange={() => dispatch(checked(todo.id))} checked={todo.isChecked} />
                       <span className='text-white text-base md:text-lg break-words flex-1'>{todo.todoText}</span>
                     </div>
                     <div className='flex items-center gap-2 shrink-0'>
                       {todo.notes && (
                         <button onClick={() => toggleNotes(todo.id)} className='p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors' title="Qeydlər">
                           <MdInfoOutline className='text-lg' />
                         </button>
                       )}
                       <button onClick={() => dispatch(duplicateTodo(todo.id))} className='p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors' title="Kopyala">
                         <MdContentCopy className='text-lg' />
                       </button>
                       <button onClick={() => openModal(todo.id)} className='p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors' title="Redaktə">
                         <MdEdit className='text-lg' />
                       </button>
                       <button onClick={() => dispatch(deleteTodo(todo.id))} className='p-2 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-colors' title="Sil">
                         <MdDelete className='text-lg' />
                       </button>
                     </div>
                   </div>
                   {showNotes[todo.id] && todo.notes && (
                     <div className='p-3 rounded-lg bg-white/10 border border-white/10'>
                       <div className='text-xs text-white/60 font-medium mb-1'>Qeydlər</div>
                       <div className='text-sm text-white/80 whitespace-pre-wrap'>{todo.notes}</div>
                     </div>
                   )}
                 </li>
               </div>
               )
             })
           ): (
            <>
              {hasAnyTodos ? (
                <div className='flex justify-center items-center py-16 animate-fade-in'>
                  <p className='text-white/70 text-lg'>Uyğun tapşırıq tapılmadı</p>
                </div>
              ) : (
                <>
                  <div className='flex justify-center items-center pt-12 pb-4 animate-fade-in'>
                    <h2 className='font-semibold text-xl text-white/80'>Siyahı boşdur</h2>
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
  )
}

export default TodoList