// GardenBed.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridItem from './gridItem'; // Ensure the correct import path
import placeHolder from '../Assets/GardenBackground.jpeg';
import { useLocation } from 'react-router-dom';
import './Styles.css'

const GardenBed = ({ link, id, name, gardenSize, beds, setBeds, displayName, addPlantsActive }) => {
  const bed = {
    id,
    name,
    gardenSize,
  };

  const location = useLocation();
  const isEditBedPage = location.pathname.includes('/edit-bed'); // Check if it's the EditBed page

  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleGridItemClick = (index) => {
    if (addPlantsActive && isEditBedPage) {
      setSelectedItem(index === selectedItem ? null : index);
    }
  };

  const handleGridItemHover = (index) => {
    if (addPlantsActive && isEditBedPage) {
      setHoveredItem(index);
    }
  };

  const handleGridItemLeave = () => {
    if (addPlantsActive && isEditBedPage) {
      setHoveredItem(null);
    }
  };

  return (
    <div>
      <div className="grid-container">
        {[...Array(gardenSize.height)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {[...Array(gardenSize.width)].map((_, colIndex) => (
              <GridItem
                key={colIndex}
                backgroundImage={placeHolder}
                isSelected={rowIndex * gardenSize.width + colIndex === selectedItem && addPlantsActive}
                isHovered={rowIndex * gardenSize.width + colIndex === hoveredItem && addPlantsActive}
                onClick={() => handleGridItemClick(rowIndex * gardenSize.width + colIndex)}
                onMouseEnter={() => handleGridItemHover(rowIndex * gardenSize.width + colIndex)}
                onMouseLeave={handleGridItemLeave}
              />
            ))}
          </div>
        ))}
      </div>
      {displayName && <h2>{name}</h2>}
      {link}
    </div>
  );
};

GardenBed.propTypes = {
  link: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gardenSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  addPlantsActive: PropTypes.bool.isRequired,
};

export default GardenBed;
