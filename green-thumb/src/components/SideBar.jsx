import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEraser, faSyncAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    setSelectedButton((prevSelected) => (prevSelected === size ? null : size));
  };

  const renderButtons = () => {
    switch (view) {
      case 'addPlants':
        return (
          <>
            <button onClick={() => handleClick('back')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <PlantButton size={1} color="green" selected={selectedButton === 1} onClick={handlePlantButtonClick} image = "../Assets/Basil.jpeg" plant = "Basil"/>
            <PlantButton size={2} color="green" selected={selectedButton === 2} onClick={handlePlantButtonClick} image = "../Assets/Tomato.jpeg" plant = "Tomato"/>
            <PlantButton size={3} color="green" selected={selectedButton === 3} onClick={handlePlantButtonClick} image = "../Assets/Peppers.jpeg" plant = "Peppers"/>
            <PlantButton size={4} color="green" selected={selectedButton === 4} onClick={handlePlantButtonClick} image = "../Assets/Dill.jpeg" plant = "Dill"/>
            <PlantButton size={5} color="green" selected={selectedButton === 5} onClick={handlePlantButtonClick} image = "../Assets/Cabbage.jpeg" plant = "Cabbage"/>
            <PlantButton size={6} color="green" selected={selectedButton === 6} onClick={handlePlantButtonClick} image = "../Assets/Egg Plant.jpeg" plant = "Egg Plant"/>
          
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

  return (
    <div className="sideBar">
      {renderButtons()}
      
    </div>
  );
};

SideBar.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  addPlantsActive: PropTypes.bool.isRequired,
  setAddPlantsActive: PropTypes.func.isRequired,
};

export default SideBar;
