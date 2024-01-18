// PlantInfo.js
import React from 'react';
import PropTypes from 'prop-types';
import './PlantInfo.css'; // You can create a CSS file for styling

const PlantInfo = ({ plant }) => {
  return (
    <div className="plant-info">
      <img src={plant.image} alt={plant.name} />
      <h2>{plant.name}</h2>
      <div>
        <strong>Beneficial Plants:</strong> {plant.beneficialPlants.join(', ')}
      </div>
      <div>
        <strong>Negative Plants:</strong> {plant.negativePlants.join(', ')}
      </div>
    </div>
  );
};

PlantInfo.propTypes = {
  plant: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    beneficialPlants: PropTypes.array.isRequired,
    negativePlants: PropTypes.array.isRequired,
  }).isRequired,
};

export default PlantInfo;
