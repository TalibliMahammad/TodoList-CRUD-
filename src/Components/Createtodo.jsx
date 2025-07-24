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
    dispatch(addToDo(values));
    form.resetFields();
    setIsModalOpen(false);
  }

  const [form] = Form.useForm();

  return (
    <div>
      <div
        className='bg-violet-700 flex items-center justify-center w-[50px] h-[50px] text-white rounded-full border border-violet-600 cursor-pointer fixed bottom-10 right-10 shadow-lg hover:shadow-xl transition-shadow duration-300'
        onClick={showModal}
      >
        <FaPlus />
      </div>

      <Modal
        title="Wrtite your todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}  >
          <Form.Item
            label="Todo Mətni"
            name="todoText"
            rules={[{ required: true, message: 'Lütfən todo mətni daxil edin!' }]}
          >
            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>

          <Form.Item
            label="Prioritet"
            name="priority"
            rules={[{   required: true, message: 'Select priority!' }]}
            initialValue={"Low"}
          >
            <select   className="w-full p-2 border border-gray-300 rounded">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High priority</option>
            </select>
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: 'Lütfən deadline daxil edin!' }]}
          >
            <input type="date" className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
          <Form.Item
            label="Who must do it"
            name="assignee"
            rules={[{ required: true, message: 'Lütfən kimin etməli olduğunu daxil edin!' }]}
          >
            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Əlavə et
          </Button>
        </Form>


      </Modal>
    </div>
  );
};

export default Createtodo;