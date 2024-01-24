// GridItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Styles.css';


const GridItem = ({ backgroundImage, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="grid-cell"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        border: isSelected ? '2px solid green' : '2px solid white',
        borderColor: isHovered ? 'green' : 'white',
        backgroundColor: isSelected ? 'black' : 'transparent',
        boxSizing: 'border-box', // Include box sizing for accurate border calculations
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

GridItem.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isHovered: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default GridItem;
