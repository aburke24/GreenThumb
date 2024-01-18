// PlantInfoPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantInfo from '../components/PlantInfo';

const PlantInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantInfo = async () => {
      try {
        const response = await fetch('path/to/dummyPlants.txt'); // Adjust the path accordingly
        const data = await response.json();
        const selectedPlant = data[id - 1]; // Adjust index if necessary
        setPlant(selectedPlant);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plant data:', error);
        setLoading(false);
      }
    };

    fetchPlantInfo();
  }, [id]);

  const handleGoBack = () => {
    // Navigate back to the EditBed page
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plant) {
    return <div>Error loading plant information</div>;
  }

  return (
    <div>
      <button onClick={handleGoBack} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Go Back
      </button>
      <h1>Plant Information</h1>
      <PlantInfo plant={plant} />
    </div>
  );
};

export default PlantInfoPage;
