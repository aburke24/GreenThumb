// AddPlantsButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

const AddPlantsButton = ({ onClick, setAddPlantsActive }) => {
  const handleClick = () => {
    setAddPlantsActive(true);
    onClick('addPlants'); // Pass 'addPlants' to distinguish the action
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faSeedling} /> Add Plants
    </button>
  );
};

AddPlantsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  setAddPlantsActive: PropTypes.func.isRequired,
};

export default AddPlantsButton;
