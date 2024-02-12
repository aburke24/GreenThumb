import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import PropTypes from 'prop-types';
import GardenBed from '../GardenBed Comp/GardenBed';
import './EditBed.css';
import DeleteModal from '../components/DeleteModal';
import SideBar from '../components/SideBar';
import { MdClose, MdCheck } from 'react-icons/md';
import BasilImage from '../Assets/Basil.jpeg';
import TomatoImage from '../Assets/Tomato.jpeg';
import CabbageImage from '../Assets/Cabbage.jpeg';
import PepperImage from '../Assets/Peppers.jpeg';
import EggPlantImage from '../Assets/Egg Plant.jpeg';
import DillImage from '../Assets/Dill.png';


const plantImages = [BasilImage, TomatoImage, PepperImage, DillImage, CabbageImage, EggPlantImage];
const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <p className="question">Are you sure you want to change the bed size? This will remove all plants.</p>
      <div className="modal-buttons">
      <button className = "cancel"onClick={() => { onCancel(); window.location.reload(); }}><MdClose/></button>
      <button className = "save" onClick={onConfirm}><MdCheck/></button>
      </div>
    </div>
  );
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
  const [isModified, setIsModified] = useState(false);

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
  const [generateBedTrigger, setGenerateBedTrigger] = useState(false);
  const [isSaveConfirmationModalVisible, setIsSaveConfirmationModalVisible] = useState(false);


  const getRandomPlantImage = () => {
    const randomIndex = Math.floor(Math.random() * plantImages.length);
    return plantImages[randomIndex];
  };

  // Handlers for input changes
 // Handlers for input changes
const generateBed = () => {
  // Set the plants array to random plant images
  setBeds((prevBeds) => {
    const updatedBeds = prevBeds.map((prevBed) =>
      prevBed.id === bedId
        ? {
            ...prevBed,
            plants: Array.from(
              { length: prevBed.gardenSize.height * prevBed.gardenSize.width },
              (_, index) => ({
                image: getRandomPlantImage(plantImages),
                position: index,
              })
            ),
          }
        : prevBed
    );

    // Mark the bed as generated
    setIsBedCleared(false);
    window.location.reload()
    return updatedBeds;
  });

  // Toggle the trigger to show the updated bed immediately
  setGenerateBedTrigger(!generateBedTrigger);
};


const handleHeightChange = (e) => {
  const newHeight = parseFloat(e.target.value) || 1; // Convert empty or non-numeric values to 0
  setHeight(newHeight);
  setGardenSize((prevGardenSize) => ({ ...prevGardenSize, height: newHeight }));
  setIsModified(true);
  setGenerateBedTrigger(!generateBedTrigger); // Trigger bed generation when height changes
   // Show the confirmation modal
};
  
  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value) || 1; // Convert empty or non-numeric values to 0
    setWidth(newWidth);
    setGardenSize((prevGardenSize) => ({ ...prevGardenSize, width: newWidth }));
    setIsModified(true);
    setGenerateBedTrigger(!generateBedTrigger); // Trigger bed generation when width changes
  };

  // Effect to update height, width, and garden size when nbed changes
  useEffect(() => {
    setHeight(nbed.gardenSize.height);
    setWidth(nbed.gardenSize.width);
    setGardenSize({ height: nbed.gardenSize.height, width: nbed.gardenSize.width });
    setIsModified(true); // Update isModified to true when name changes
  }, [nbed]);

  useEffect(() => {
    if (name !== nbed.name) {
      
      handleBed(); // Trigger save when the name is modified
    }
  }, [name, nbed.name]);

  // Function to clear the bed
  const clearBed = () => {
    // Set the plants array to an empty array for the specified bed
    setBeds((prevBeds) => {
      const updatedBeds = prevBeds.map((prevBed) =>
        prevBed.id === bedId ? { ...prevBed, plants: [] } : prevBed
      );
      return updatedBeds;
    });
  
    // Mark the bed as cleared
    setIsBedCleared(true);
    setGenerateBedTrigger(!generateBedTrigger); // Trigger bed generation when bed is cleared
  };

  // Handler for saving changes to the bed
  // Handler for saving changes to the bed
  // Handler for saving changes to the bed
  const handleBed = (e) => {
    // Prevent the default form submission behavior
    e && e.preventDefault();
  
    console.log("The isModified is true");
    console.log(isModified);
  
    if (isModified) {
      const updatedBed = { ...nbed, gardenSize, plants };
  
      // Check if the name is not empty, then update it
      if (name.trim() !== '') {
        updatedBed.name = name.trim();
      }
  
      // Save gridContent as an array to local storage
      localStorage.setItem(`plants_${bedId}`, JSON.stringify(updatedBed.plants));
  
      // Update the bed in the beds array
      setBeds((prevBeds) =>
        prevBeds.map((prevBed) => (prevBed.id === bedId ? updatedBed : prevBed))
      );
  
      // Update local storage
      localStorage.setItem('beds', JSON.stringify(beds));
  
      // Toggle the trigger to show the updated bed immediately
      setGenerateBedTrigger(!generateBedTrigger);
  
      setIsModified(false);
  
      // Update the name state immediately only if it's not empty
      if (name.trim() !== '') {
        setName(updatedBed.name);
      }
  
      // Check if only the name has changed
      if (!(Object.keys(updatedBed).length === 1 && updatedBed.constructor === Object)) {
        // Set the state to show the save confirmation modal
        setIsSaveConfirmationModalVisible(false);
      }
    }
  
    // Clear the bed if it was marked as cleared
    if (isBedCleared) {
      console.log("The bed is cleared");
      clearBed();
    }
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
  onBlur={handleBed}  // Trigger handleBed when the input field is deselected
  autoFocus
/>
        <div className="Dimensions">
          <label className="heightLabel" htmlFor="height">Height:</label>
          <input
            type="number"
            className="height"
            placeholder={nbed.gardenSize.height}
            value={height}
            onChange={handleHeightChange}
            autoFocus
          />
          <label className="widthLabel" htmlFor="width">Width:</label>
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
          <MdCheck style={{ fontWeight: 'bold' }} />
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
          trigger={generateBedTrigger} // Pass the trigger as a prop
        />
      </div>

      <button className="btnDelete" onClick={handleDelete}>
        Delete Bed
      </button>

      {isDeleteModalVisible && (
        <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
          {isSaveConfirmationModalVisible && (
        <ConfirmationModal
          onConfirm={() => {
            // Handle the confirmation action
            // (e.g., clear the bed)
            clearBed();
            setIsSaveConfirmationModalVisible(false);
            setIsModified(false);
            
          }}
          onCancel={() => setIsSaveConfirmationModalVisible(false)}
        />
      )}
      
    </div>
  );
};
EditBed.propTypes = {
  beds: PropTypes.array.isRequired,
  setBeds: PropTypes.func.isRequired,
};

export default EditBed;

