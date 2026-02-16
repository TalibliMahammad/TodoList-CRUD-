import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Modal, Button, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { addToDo } from './CounterSlice/CreateSlice';

const Createtodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    const tags = values.tags ? String(values.tags).split(',').map(t => t.trim()).filter(t => t) : []
    dispatch(addToDo({
      ...values,
      tags,
    }));
    form.resetFields();
    setIsModalOpen(false);
  }

  const [form] = Form.useForm();

  return (
    <div>
      <button
        type="button"
        onClick={showModal}
        className='flex items-center justify-center w-14 h-14 text-white rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl border border-white/20 cursor-pointer fixed bottom-6 right-6 md:bottom-8 md:right-8 transition-all z-50'
      >
        <FaPlus className='text-xl' />
      </button>

      <Modal
        title={
          <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Create New Todo
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
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
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Todo Text</span>}
            name="todoText"
            rules={[{ required: true, message: 'Please enter todo text!' }]}
          >
            <input 
              type="text" 
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
              placeholder="Enter your todo..."
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Priority</span>}
            name="priority"
            rules={[{ required: true, message: 'Select priority!' }]}
            initialValue={"Low"}
          >
            <select className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </Form.Item>

          <Form.Item
            label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Deadline</span>}
            name="deadline"
            rules={[{ required: true, message: 'Please enter deadline!' }]}
          >
            <input 
              type="date" 
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
            />
          </Form.Item>
          
          <Form.Item
            label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Assignee</span>}
            name="assignee"
            rules={[{ required: true, message: 'Please enter assignee!' }]}
          >
            <input 
              type="text" 
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
              placeholder="Who should do this?"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Category (Optional)</span>}
              name="category"
            >
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
                placeholder="e.g., Work, Personal..."
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Tags (Optional)</span>}
              name="tags"
            >
              <input 
                type="text" 
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" 
                placeholder="tag1, tag2, tag3..."
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-base font-semibold text-gray-700 dark:text-gray-300">Notes (Optional)</span>}
            name="notes"
          >
            <textarea 
              rows={3}
              className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none" 
              placeholder="Add additional notes..."
            />
          </Form.Item>
          
          <Button 
            type="primary" 
            htmlType="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Add Todo
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Createtodo;