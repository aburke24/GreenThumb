import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GridItem from './gridItem';
import placeHolder from '../Assets/GardenBackground.jpeg';
import { useLocation } from 'react-router-dom';
import './Styles.css';
import BasilImage from '../Assets/Basil.jpeg';
import TomatoImage from '../Assets/Tomato.jpeg';
import CabbageImage from '../Assets/Cabbage.jpeg';
import PepperImage from '../Assets/Peppers.jpeg';
import EggPlantImage from '../Assets/Egg Plant.jpeg';
import DillImage from '../Assets/Dill.png';

const GardenBed = ({ link, id, name, gardenSize, plants, beds, setBeds, displayName, addPlantsActive, selectedButton, isBedCleared, setIsBedCleared, deletePlantActive,isMainPage}) => {
  const bed = {
    id,
    name,
    gardenSize,
    plants
  };
  const calculateDynamicWidth = () => {
    const maxGridCellWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--max-grid-cell-width'), 10);
    const minGridCellWidth = 120; // Set your minimum width or adjust as needed
    const screenWidth = window.innerWidth;
  
    // Calculate the number of columns based on the screen width
    const gridColumns = Math.floor(screenWidth / maxGridCellWidth);
  
    // Ensure a minimum number of columns
    const effectiveGridColumns = Math.max(1, gridColumns);
  
    // Calculate the actual width of each grid cell
    const actualGridCellWidth = Math.min(
      maxGridCellWidth,
      screenWidth / effectiveGridColumns
    );
  
    // Set the CSS variable for grid cell width
    document.documentElement.style.setProperty(
      "--grid-columns",
      effectiveGridColumns
    );
  
    return `${actualGridCellWidth}px`;
  };
  const [gridContent, setGridContent] = useState(() => {
    // Initialize from plants array or create an empty grid
    return plants || Array(gardenSize.height * gardenSize.width).fill(null);
  });

  const location = useLocation();
  const isEditBedPage = location.pathname.includes('/edit-bed');

  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleGridItemClick = (rowIndex, colIndex) => {
    if(addPlantsActive || deletePlantActive){
    const cellIndex = rowIndex * gardenSize.width + colIndex;
    const newContent = [...gridContent];

    // Set the content of the clicked cell
    newContent[cellIndex] = getSelectedContent();

    setGridContent(newContent);
    setSelectedItem(cellIndex);

    // Save updated grid content to the plants array
    saveGridToPlants(newContent);
    }
  };

  const saveGridToPlants = (content) => {
    // Assuming plants is an array in the component's state
    // Update plants with the new content
    setBeds((prevBeds) => {
      const updatedBeds = prevBeds.map((prevBed) =>
        prevBed.id === id ? { ...prevBed, plants: content } : prevBed
      );
      return updatedBeds;
    });
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

  useEffect(() => {
    if (isBedCleared) {
      // If isBedCleared is true, perform the actions to reload or clear the garden bed
      // For example, reset the gridContent or perform any other necessary actions

      // Reset gridContent to an empty grid
      setGridContent(Array(gardenSize.height * gardenSize.width).fill(null));
      setIsBedCleared(false);

      // Additional actions if needed
    } else if (!isEditBedPage) {
      // Additional initialization when not in edit mode
      // For example, loading grid content from plants array
      setGridContent(plants || Array(gardenSize.height * gardenSize.width).fill(null));
    }
  }, [isBedCleared, id, isEditBedPage, plants, gardenSize]);

  return (
    <div style={{ height: '100%' }}> {/* Set a fixed height based on grid cell height */}
      <div className="grid-container" style={{ '--max-grid-cell-width': calculateDynamicWidth() }}>
        {[...Array(gardenSize.height)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {[...Array(gardenSize.width)].map((_, colIndex) => (
              <GridItem
                key={colIndex}
                backgroundImage={gridContent[rowIndex * gardenSize.width + colIndex]?.image || placeHolder}
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
      {displayName && <h2 className="centered-name">{name}</h2>}
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
  beds: PropTypes.array.isRequired,
  setBeds: PropTypes.func.isRequired,
  displayName: PropTypes.bool,
  addPlantsActive: PropTypes.bool.isRequired,
  selectedButton: PropTypes.number,
  isMainPage: PropTypes.bool,
};

export default GardenBed;
