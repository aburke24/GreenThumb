import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import PropTypes from 'prop-types';
import GardenBed from '../GardenBed Comp/GardenBed';
import './EditBed.css';
import DeleteModal from '../components/DeleteModal';
import SideBar from '../components/SideBar';
import { MdCheck, MdClose } from 'react-icons/md';
import BasilImage from '../Assets/Basil.jpeg';
import TomatoImage from '../Assets/Tomato.jpeg';
import CabbageImage from '../Assets/Cabbage.jpeg';
import PepperImage from '../Assets/Peppers.jpeg';
import EggPlantImage from '../Assets/Egg Plant.jpeg';
import DillImage from '../Assets/Dill.png';

const plantImages = [BasilImage, TomatoImage, PepperImage, DillImage, CabbageImage, EggPlantImage];

  const getRandomPlantImage = () => {
    const randomIndex = Math.floor(Math.random() * plantImages.length);
    return plantImages[randomIndex];
  };
const EditBed = ({ bed, beds, setBeds }) => {
  const { id } = useParams();
  const bedId = parseInt(id);
  const nbed = beds.find((item) => item && item.id === bedId);
  const [selectedButton, setSelectedButton] = useState(null);

  // State for bed details
  const [name, setName] = useState(bed ? bed.name : '');
  const [plants, setPlants] = useState(bed ? bed.plants : []);
  const [gardenSize, setGardenSize] = useState({
    height: bed ? bed.gardenSize.height : 0,
    width: bed ? bed.gardenSize.width : 0,
  });
  const [height, setHeight] = useState(bed ? bed.gardenSize.height : 0);
  const [width, setWidth] = useState(bed ? bed.gardenSize.width : 0);

  // State for managing clicked item index
  const [clickedItemIndex, setClickedItemIndex] = useState(null);

  // State for tracking cleared status
  const [isBedCleared, setIsBedCleared] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Modal visibility state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // State for controlling addPlants functionality
  const [addPlantsActive, setAddPlantsActive] = useState(false);
  const [deletePlantActive, setDeletePlantActive] = useState(false);

  
  // Handlers for input changes
  const handleHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    setHeight(newHeight);
    setGardenSize((prevGardenSize) => ({ ...prevGardenSize, height: newHeight }));
  };
  const generateBed = () => {
    // Generate a random plant image for each grid item
    const newPlants = Array(gardenSize.height * gardenSize.width).fill(null).map(() => ({
      image: getRandomPlantImage(),
    }));

    // Save the generated bed to the state
    setBeds((prevBeds) => {
      const updatedBeds = prevBeds.map((prevBed) =>
        prevBed.id === bedId ? { ...prevBed, plants: newPlants } : prevBed
      );
      return updatedBeds;
    });

    // Set the generated bed to the current bed state
    setPlants(newPlants);
  };


  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    setWidth(newWidth);
    setGardenSize((prevGardenSize) => ({ ...prevGardenSize, width: newWidth }));
  };

  // Effect to update height, width, and garden size when nbed changes
  useEffect(() => {
    setHeight(nbed.gardenSize.height);
    setWidth(nbed.gardenSize.width);
    setGardenSize({ height: nbed.gardenSize.height, width: nbed.gardenSize.width });
  }, [nbed]);

  // Function to clear the bed
  const clearBed = () => {
    // Set the plants array to an empty array
    setBeds((prevBeds) => {
      const updatedBeds = prevBeds.map((prevBed) =>
        prevBed.id === bedId ? { ...prevBed, plants: [] } : prevBed
      );
      return updatedBeds;
    });

    // Mark the bed as cleared
    setIsBedCleared(true);
  };

  // Handler for saving changes to the bed
  const handleBed = (e) => {
    e.preventDefault();

    if (name || gardenSize.height || gardenSize.width) {
      const updatedBed = { ...nbed, plants };

      if (name) {
        updatedBed.name = name;
      }

      if (gardenSize.height || gardenSize.width) {
        updatedBed.gardenSize = { ...gardenSize };
      }

      // Save gridContent as an array to local storage
      localStorage.setItem(`plants_${bedId}`, JSON.stringify(updatedBed.plants));
    }

    // Clear the bed if it was marked as cleared
    if (isBedCleared) {
      clearBed();
    }

    navigate('/');
  };

  // Handler for button clicks
  const handleButtonClick = (buttonLabel) => {
    console.log(`Button "${buttonLabel}" clicked`);
  };

  // Handler for deleting the bed
  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteModalVisible(true);
    document.body.addEventListener('click', handleCancelDeleteOutside);
  };

  // Handler for cancelling the delete action
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    document.body.removeEventListener('click', handleCancelDeleteOutside);
  };

  // Handler for clicking outside the delete modal to cancel
  const handleCancelDeleteOutside = (e) => {
    const modal = document.querySelector('.modal');
    const deleteButton = document.querySelector('.btnDelete');

    if (modal && !modal.contains(e.target) && !deleteButton.contains(e.target)) {
      setIsDeleteModalVisible(false);
      document.body.removeEventListener('click', handleCancelDeleteOutside);
    }
  };

  // Handler for confirming the delete action
  const handleConfirmDelete = () => {
    const newBeds = beds.filter((item) => item.id !== bedId);
    setBeds(newBeds);
    setIsDeleteModalVisible(false);
    navigate('/');
    document.body.removeEventListener('click', handleCancelDeleteOutside);
  };

  // Handler for clicking on a grid item
  const handleGridItemClick = (index) => {
    setClickedItemIndex(index);
  };

  return (
    <div>
      <header>
        <div className="backArrow">
          <Link to="/">
            <IoIosArrowBack /> 
          </Link>
        </div>
        <input
          className="name"
          type="text"
          placeholder={nbed.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <div className ="Dimensions" >

        <label for="height">  Height: </label>
        <input
          type="number"
          className="height"
          placeholder={nbed.gardenSize.height}
          value={height}
          onChange={handleHeightChange}
          autoFocus
        />
        <label for="width"> Width: </label>
        <input
          className="width"
          type="number"
          placeholder={nbed.gardenSize.width}
          value={width}
          onChange={handleWidthChange}
          autoFocus
        />
        
        </div>
        <button className="btnSave" onClick={handleBed} style={{ marginRight: '10px' }}>
          <MdCheck style={{ fontWeight: 'bold' }}/> 
        </button>
        

      </header>

      
        

        <SideBar
          handleButtonClick={handleButtonClick}
          setAddPlantsActive={setAddPlantsActive}
          addPlantsActive={addPlantsActive}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          onClearBedClick={clearBed} 
          deletePlantActive={deletePlantActive}
          setDeletePlantActive={setDeletePlantActive}
          generateBed={generateBed}
        />

        <div className="bed">
          <GardenBed
            key={`${gardenSize.height}-${gardenSize.width}`}
            id={nbed.id}
            name={nbed.name}
            gardenSize={gardenSize}
            plants={nbed.plants}
            beds={beds}
            setBeds={setBeds}
            displayName={false}
            addPlantsActive={addPlantsActive}
            clickedItemIndex={clickedItemIndex}
            onGridItemClick={handleGridItemClick}
            selectedButton={selectedButton}
            isBedCleared={isBedCleared}
            setIsBedCleared={setIsBedCleared}
            deletePlantActive={deletePlantActive}
            generateBed={generateBed}
            isMainPage={false}
          />
        </div>
        
        <button className="btnDelete" onClick={handleDelete}>
         Delete Bed
        </button>

      {isDeleteModalVisible && (
        <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </div>
  );
};

EditBed.propTypes = {
  beds: PropTypes.array.isRequired,
  setBeds: PropTypes.func.isRequired,
};

export default EditBed;
