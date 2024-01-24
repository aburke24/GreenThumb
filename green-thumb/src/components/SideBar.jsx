// SideBar.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEraser,
  faSyncAlt,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import AddPlantsButton from './AddPlantsButton';
import PlantButton from './PlantButton';
import './SideBar.css';

const SideBar = ({ handleButtonClick, addPlantsActive, setAddPlantsActive }) => {
  const [view, setView] = useState('default');
  const [selectedButton, setSelectedButton] = useState(null);
 

  const handleClick = (buttonName) => {
    if (buttonName === 'addPlants') {
      setAddPlantsActive(true);
      setView('addPlants');
    } else if (buttonName === 'back') {
      setView('default');
    } else {
      handleButtonClick();
    }
  };
  const handlePlantButtonClick = (size) => {
    // Deselect the currently selected button if clicked again
    if (selectedButton === size) {
      setSelectedButton(null);
    } else {
      // Select the clicked button
      setSelectedButton(size);
    }

    // Callback to parent component
    setSelectedButton(selectedButton === size ? 0 : size);
  };

  const renderButtons = () => {
    switch (view) {
      case 'addPlants':
        return (
          <>
            <button onClick={() => handleClick('back')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            {[1, 2, 3, 4, 5].map((index) => (
              <PlantButton
                key={index}
                size={index}
                color="rgba(255, 0, 0, 0.3)"
                onButtonClick={() => {}}
                onClick={() => handlePlantButtonClick(index)}
                // Remove selected prop
              >
                Plant {index}
              </PlantButton>
            ))}
          </>
        );
      default:
        return (
          <>
            <AddPlantsButton
              onClick={() => handleClick('addPlants')}
              setAddPlantsActive={setAddPlantsActive}
            />
            <button onClick={() => handleClick('clearBed')}>
              <FontAwesomeIcon icon={faEraser} /> Clear Bed
            </button>
            <button onClick={() => handleClick('deletePlant')}>
              <FontAwesomeIcon icon={faTrash} /> Delete Plant
            </button>
            <button onClick={() => handleClick('generateBed')}>
              <FontAwesomeIcon icon={faSyncAlt} /> Generate Bed
            </button>
          </>
        );
    }
  };

  return <div className="sideBar">{renderButtons()}</div>;
};
  
    

SideBar.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  addPlantsActive: PropTypes.bool.isRequired,
  setAddPlantsActive: PropTypes.func.isRequired,
};

export default SideBar;
