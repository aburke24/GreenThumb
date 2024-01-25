// GridItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Styles.css';

const GridItem = ({ backgroundImage, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave, customStyle }) => {
  const overlayStyle = {
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.5)' : 'transparent', // White overlay on hover
  };

  const imageStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className="grid-Container">
    <div
      className="grid-cell"
      style={{
        ...imageStyle,
        ...customStyle,
        border: isSelected ? '2px solid green' : '2px solid white',
        borderColor: isHovered ? 'green' : 'white',
        backgroundColor: isSelected ? 'black' : 'transparent',
        boxSizing: 'border-box',
        position: 'relative',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="white-overlay" style={overlayStyle}></div>
    </div>
    </div>
  );
};

GridItem.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  isHovered: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  customStyle: PropTypes.object, // Custom styles prop
};

export default GridItem;
