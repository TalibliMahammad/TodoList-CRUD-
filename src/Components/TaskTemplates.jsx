import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { MdContentCopy } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToDo } from './CounterSlice/CreateSlice'

const templates = [
  {
    name: 'Meeting Preparation',
    todoText: 'Prepare agenda and materials',
    priority: 'High',
    category: 'Work',
    tags: ['meeting', 'preparation'],
  },
  {
    name: 'Code Review',
    todoText: 'Review pull request',
    priority: 'Medium',
    category: 'Development',
    tags: ['code', 'review'],
  },
  {
    name: 'Daily Standup',
    todoText: 'Attend daily standup meeting',
    priority: 'Medium',
    category: 'Work',
    tags: ['meeting', 'standup'],
  },
  {
    name: 'Documentation',
    todoText: 'Update project documentation',
    priority: 'Low',
    category: 'Work',
    tags: ['documentation'],
  },
  {
    name: 'Bug Fix',
    todoText: 'Fix critical bug',
    priority: 'High',
    category: 'Development',
    tags: ['bug', 'fix'],
  },
]

const TaskTemplates = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const useTemplate = (template) => {
    dispatch(addToDo({
      todoText: template.todoText,
      priority: template.priority,
      category: template.category,
      tags: template.tags,
      deadline: '',
      assignee: '',
      notes: `Template: ${template.name}`,
    }))
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-[56px] px-5 rounded-xl text-white font-semibold bg-white/15 hover:bg-white/25 border border-white/20 shadow-lg transition-all flex items-center gap-2"
        type="button"
      >
        <MdContentCopy className="text-xl" />
        Templates
      </button>

      <Modal
        title={
          <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Task Templates
          </span>
        }
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        className="modern-modal"
        styles={{
          content: {
            borderRadius: '20px',
            padding: '24px',
          },
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template, idx) => (
            <div
              key={idx}
              onClick={() => useTemplate(template)}
              className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-500 cursor-pointer transition-all hover:shadow-lg bg-white dark:bg-gray-700"
            >
              <div className="font-semibold text-gray-800 dark:text-white mb-2">{template.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{template.todoText}</div>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-2 py-1 text-xs rounded ${
                  template.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  template.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {template.priority}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {template.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default TaskTemplates
