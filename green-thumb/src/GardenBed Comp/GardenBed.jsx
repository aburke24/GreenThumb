// GardenBed.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridItem from './gridItem'; // Ensure the correct import path
import placeHolder from '../Assets/GardenBackground.jpeg';
import { useLocation } from 'react-router-dom';
import './Styles.css';
import BasilImage from '../Assets/Basil.jpeg';
import TomatoImage from '../Assets/Tomato.jpeg';
import CabbageImage from '../Assets/Cabbage.jpeg';
import PepperImage from '../Assets/Peppers.jpeg';
import EggPlantImage from '../Assets/Egg Plant.jpeg';
import DillImage from '../Assets/Dill.jpeg';

const GardenBed = ({ link, id, name, gardenSize, beds, setBeds, displayName, addPlantsActive, selectedButton }) => {
  const bed = {
    id,
    name,
    gardenSize,
  };
  // this holds the images
  const [gridContent, setGridContent] = useState(Array(gardenSize.height * gardenSize.width).fill(null));

  const location = useLocation();
  const isEditBedPage = location.pathname.includes('/edit-bed'); // Check if it's the EditBed page

  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleGridItemClick = (rowIndex, colIndex) => {
    const cellIndex = rowIndex * gardenSize.width + colIndex;
    const newContent = [...gridContent];

    // Set the content of the clicked cell
    newContent[cellIndex] = getSelectedContent();

    setGridContent(newContent);
    setSelectedItem(cellIndex); // Add this line to set the selected item
  };

  const getSelectedContent = () => {
    const defaultBrownBackground = { backgroundColor: 'brown' };

    if (selectedButton === 1) {
      return { image: BasilImage, button: 1 };
    } else if (selectedButton === 2) {
      return { image: TomatoImage, button: 2 };
    } else if (selectedButton === 3) {
      return { image: PepperImage, button: 3 };
    } else if (selectedButton === 4) {
      return { image: DillImage, button: 4 };
    } else if (selectedButton === 5) {
      return { image: CabbageImage, button: 5 };
    } else if (selectedButton === 6) {
      return { image: EggPlantImage, button: 6 };
    } else {
      return defaultBrownBackground;
    }
  };

  const handleGridItemHover = (index) => {
    if (addPlantsActive) {
      setHoveredItem(index);
    }
  };

  const handleGridItemLeave = () => {
    if (addPlantsActive) {
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
                backgroundImage={gridContent[rowIndex * gardenSize.width + colIndex]?.image || placeHolder} // Pass selected content's image or default placeholder
                isSelected={rowIndex * gardenSize.width + colIndex === selectedItem && addPlantsActive}
                isHovered={rowIndex * gardenSize.width + colIndex === hoveredItem && addPlantsActive}
                onClick={() => handleGridItemClick(rowIndex, colIndex)}
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
