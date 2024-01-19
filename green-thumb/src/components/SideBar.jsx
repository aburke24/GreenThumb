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
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handlePlantButtonClick = (plant) => {
    handleSelectedPlantChange(plant);
  };

  const handleSelectedPlantChange = (selectedPlant) => {
    // Add your logic to handle the selected plant change
    console.log(`Selected Plant: ${selectedPlant}`);
    // Deselect the currently selected plant button
    deselectOtherButtonsInGroup('plantGroup', null);
  };
  
  const deselectOtherButtonsInGroup = (group, currentButton) => {
    const buttons = document.querySelectorAll(`.plantButton[group="${group}"]`);
    buttons.forEach((button) => {
      if (button !== currentButton) {
        // Deselect other buttons by updating their state directly
        button.component.buttonSelected(false);
      }
    });
  };

  const resetPlantButtons = () => {
    
    const buttons = document.querySelectorAll('.plantButton');
    buttons.forEach((button) => {
      
      // Check if button.component is defined before calling button.component.buttonSelected
      if (button.component) {
        console.log("All buttons deselected");
        button.component.buttonSelected(false);
        
      }
    });
  };

  const handleClick = (buttonName) => {
    if (buttonName === 'addPlants') {
      setAddPlantsActive(true);
      setView('addPlants');
      setSelectedPlant(null); // Reset selectedPlant when entering 'addPlants' view
    } else if (buttonName === 'back') {
      setView('default');
      resetPlantButtons(); // Deselect all PlantButtons when back is clicked
    } else {
      handleButtonClick();
    }
  };

  const renderButtons = () => {
    const plantButtonProps = {
      onClick: handlePlantButtonClick,
      disabled: selectedPlant !== null && selectedPlant !== 'Plant 1',
      deselectOtherButtonsInGroup: () => deselectOtherButtonsInGroup('plantGroup'),
      group: 'plantGroup',
      resetPlantButtons: resetPlantButtons, // Pass resetPlantButtons to PlantButton
       // Ensure this is a function
    };
    

    switch (view) {
      case 'addPlants':
        return (
          <>
            <button onClick={() => handleClick('back')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            {[1, 2, 3, 4, 5].map((index) => (
              <PlantButton key={index} {...plantButtonProps}>
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
