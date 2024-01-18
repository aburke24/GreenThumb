// GardenBed.jsx
import React, { useState, useEffect } from 'react';
import { GridContainer, GridItem } from './GardenBedStyles';
import PropTypes from 'prop-types';
import placeHolder from '../Assets/GardenBackground.jpeg';
import { Link } from 'react-router-dom';

const GardenBed = ({ id, name, gardenSize, beds, setBeds, displayName, addPlantsActive }) => {
  const bed = {
    id,
    name,
    gardenSize,
  };

  const [rows, setRows] = useState(gardenSize.height);
  const [columns, setColumns] = useState(gardenSize.width);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setRows(gardenSize.height);
    setColumns(gardenSize.width);
  }, [gardenSize.height, gardenSize.width]);

  const handleGridItemClick = (index) => {
    if (addPlantsActive) {
      setSelectedItem(index === selectedItem ? null : index);
    }
  };

  const handleGridItemHover = (index) => {
    if (addPlantsActive) {
      console.log(`Hovered over item ${index} while addPlantsActive is true`);
      setHoveredItem(index);
    }
  };

  const handleGridItemLeave = () => {
    if (addPlantsActive) {
      console.log('Left the grid item');
      setHoveredItem(null);
    }
  };

  return (
    <Link
      to={{
        pathname: `/edit-bed/${bed.id}`,
        state: { bed, beds, setBeds },
      }}
    >
      <div>
      <GridContainer style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {initializeGridWithPlaceholder(rows, columns).map((plantImage, index) => (
            <GridItem
              key={index}
              style={{
                backgroundImage: `url(${plantImage})`,
                border: index === selectedItem && addPlantsActive ? '2px solid green' : '2px solid white',
                borderColor: index === hoveredItem && addPlantsActive ? 'green' : 'white',
              }}
              onClick={() => handleGridItemClick(index)}
              onMouseEnter={() => handleGridItemHover(index)}
              onMouseLeave={handleGridItemLeave}
            />
          ))}
        </GridContainer>
        {displayName && <h2>{name}</h2>}
      </div>
    </Link>
  );
};
const initializeGridWithPlaceholder = (rows, columns) => {
  const placeholderImages = Array.from({ length: rows * columns }, () => placeHolder);
  return placeholderImages;
};

GardenBed.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gardenSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  addPlantsActive: PropTypes.bool.isRequired,
};

export default GardenBed;
