import React from 'react';
import { Modal, Input, Button } from 'antd';


const EditModal = ({ isModalOpen, editForm, setEditForm, handleSave, handleCancel }) => {
  return (
    <Modal
      title={
        <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Edit Todo
        </span>
      }
      open={isModalOpen}
      onOk={handleSave}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} className="rounded-xl px-6">
          Cancel
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save Changes
        </Button>
      ]}
      className="modern-modal"
      styles={{
        content: {
          borderRadius: '20px',
          padding: '24px',
        },
        header: {
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          paddingBottom: '16px',
          marginBottom: '20px',
        }
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-sm font-semibold text-gray-600 mb-2">Todo text</div>
          <Input
            value={editForm.todoText}
            onChange={(e) => setEditForm((prev) => ({ ...prev, todoText: e.target.value }))}
            placeholder="Edit your todo..."
            className="p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
            onPressEnter={handleSave}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Priority</div>
            <select
              value={editForm.priority}
              onChange={(e) => setEditForm((prev) => ({ ...prev, priority: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Deadline</div>
            <input
              type="date"
              value={editForm.deadline}
              onChange={(e) => setEditForm((prev) => ({ ...prev, deadline: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Assignee</div>
            <input
              type="text"
              value={editForm.assignee}
              onChange={(e) => setEditForm((prev) => ({ ...prev, assignee: e.target.value }))}
              placeholder="Name..."
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Category (Optional)</div>
            <input
              type="text"
              value={editForm.category || ''}
              onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Work, Personal..."
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">Tags (comma separated)</div>
            <input
              type="text"
              value={Array.isArray(editForm.tags) ? editForm.tags.join(', ') : ''}
              onChange={(e) => {
                const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t)
                setEditForm((prev) => ({ ...prev, tags }))
              }}
              placeholder="tag1, tag2, tag3..."
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-600 mb-2">Notes (Optional)</div>
          <textarea
            rows={3}
            value={editForm.notes || ''}
            onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Add additional notes..."
            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;