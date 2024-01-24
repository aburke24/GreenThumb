import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PlantButton = ({ size, color, selected, onClick, image, plant }) => {
  const handleButtonClick = () => {
    onClick(size); // Pass the size to the onClick function
  };

  // Set a fixed button size
  const buttonSize = 50; // Adjust this value based on your desired button size

  return (
    <button
      className={`picture ${selected ? 'selected' : ''}`}
      style={{
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        backgroundColor: selected ? color : '',
      }}
      onClick={handleButtonClick}
    >
      {plant}
      {/* You can customize the picture appearance here */}
      <div className={`picture-inner size-${size}`} style={{ backgroundColor: color }}></div>
    </button>
  );
};
export default PlantButton;