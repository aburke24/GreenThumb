// AddPlantsButton.js
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';

const AddPlantsButton = ({ onClick, setAddPlantsActive }) => {
  const handleClick = () => {
    // Set the "Add Plants" button to active state
    setAddPlantsActive(true);
    onClick();
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
