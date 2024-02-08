import React, { useState, useEffect } from 'react';
import './BedModal.css';
import { MdCheck, MdClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const AddBedModal = ({ onClose, onSave, setBeds }) => {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [name, setName] = useState('');
  const [errorHeight, setErrorHeight] = useState(false);
  const [errorWidth, setErrorWidth] = useState(false);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000); // Adjust the range as needed
  };

  const handleSave = () => {
    const parsedHeight = parseInt(height);
    const parsedWidth = parseInt(width);

    if (
      isNaN(parsedHeight) ||
      isNaN(parsedWidth) ||
      parsedHeight <= 0 ||
      parsedWidth <= 0 ||
      parsedHeight >= 20 ||
      parsedWidth >= 20
    ) {
      setErrorHeight(parsedHeight <= 0 || parsedHeight >= 20);
      setErrorWidth(parsedWidth <= 0 || parsedWidth >= 20);
      return;
    }

    setErrorHeight(false);
    setErrorWidth(false);

    const newBed = {
      id: generateRandomId(),
      name,
      gardenSize: {
        height: parsedHeight,
        width: parsedWidth,
      },
      plants: [],
    };
    console.log("The ID is: ", newBed.id);
    setBeds((prevBeds) => [newBed, ...prevBeds]);
    onSave(newBed);
    onClose();
  };
  

  // Handle click outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.modal') === null) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <h2>Add New Bed</h2>
      <div className="modal-content">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              setErrorHeight(false);
            }}
            className={errorHeight ? 'error' : ''}
          />
          ft
        </label>
        <label>
          Short Side:
          <input
            type="number"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              setErrorWidth(false);
            }}
            className={errorWidth ? 'error' : ''}
          />
          ft
        </label>
      </div>
      <div className="modal-buttons">
        <button onClick={onClose} className="cancel">
          <MdClose size={20} />
        </button>
        <button onClick={handleSave} className="save">
          <MdCheck size={20} />
        </button>
      </div>
    </div>
  );
};

export default AddBedModal;
