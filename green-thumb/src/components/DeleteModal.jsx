import React from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import './DeleteBedModal.css'

const DeleteBedModal = ({ onConfirm,onCancel }) => {
  return (
    <div className="modal">
      <h2>Delete Bed</h2>
      <div className="modal-content">
        <p>Are you sure you want to delete this bed?</p>
      </div>
      <div className="modal-buttons">
      <button onClick={onCancel} className="Decline">
          <MdClose size={20} />
        </button>
        <button onClick={onConfirm} className="confirm">
          <MdCheck size={20} />
          
        </button>
      </div>
    </div>
  );
};

export default DeleteBedModal;
