import React from 'react';
import { Modal, Input } from 'antd';


const EditModal = ({ isModalOpen, editValue, setEditValue, handleSave, handleCancel }) => {
  return (
    <Modal
      title="Edit Todo"
      open={isModalOpen}
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        placeholder="Edit your todo"
      />
    </Modal>
  );
};

export default EditModal;