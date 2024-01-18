import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import PropTypes from 'prop-types';
import GardenBed from '../GardenBed Comp/GardenBed';
import './EditBed.css';
import DeleteModal from '../components/DeleteModal';
import SideBar from '../components/SideBar';

const EditBed = ({ bed, beds, setBeds }) => {
  const { id } = useParams();
  const bedId = parseInt(id);
  const nbed = beds.find((item) => item && item.id === bedId);

  const [name, setName] = useState(bed ? bed.name : '');
  const [plants, setPlants] = useState(bed ? bed.plants : []);
  const [gardenSize, setGardenSize] = useState({
    height: bed ? bed.gardenSize.height : 0,
    width: bed ? bed.gardenSize.width : 0,
  });
  const [height, setHeight] = useState(bed ? bed.gardenSize.height : 0);
  const [width, setWidth] = useState(bed ? bed.gardenSize.width : 0);
  const [clickedItemIndex, setClickedItemIndex] = useState(null); // Track the clicked item index
  const navigate = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [addPlantsActive, setAddPlantsActive] = useState(false);
  
  const handleHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    setHeight(newHeight);
    setGardenSize((prevGardenSize) => ({ ...prevGardenSize, height: newHeight }));
  };

  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    setWidth(newWidth);
    setGardenSize((prevGardenSize) => ({ ...prevGardenSize, width: newWidth }));
  };

  useEffect(() => {
    setHeight(nbed.gardenSize.height);
    setWidth(nbed.gardenSize.width);
    setGardenSize({ height: nbed.gardenSize.height, width: nbed.gardenSize.width });
  }, [nbed]);

  const handleBed = (e) => {
    e.preventDefault();
    console.log('Updated Garden Size: ', gardenSize);

    if (name || gardenSize.height || gardenSize.width) {
      const updatedBed = { ...nbed, plants };

      if (name) {
        updatedBed.name = name;
      }

      if (gardenSize.height || gardenSize.width) {
        updatedBed.gardenSize = { ...gardenSize };
      }

      const newBeds = beds.map((item) => (item.id === bedId ? updatedBed : item));

      setBeds(newBeds);
    }

    navigate('/');
  };

  const handleButtonClick = (buttonLabel) => {
    // Handle button click based on the label
    console.log(`Button "${buttonLabel}" clicked`);
    // Add your logic here
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteModalVisible(true);
    document.body.addEventListener('click', handleCancelDeleteOutside);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    document.body.removeEventListener('click', handleCancelDeleteOutside);
  };

  const handleCancelDeleteOutside = (e) => {
    const modal = document.querySelector('.modal');
    const deleteButton = document.querySelector('.btnDelete');

    if (modal && !modal.contains(e.target) && !deleteButton.contains(e.target)) {
      setIsDeleteModalVisible(false);
      document.body.removeEventListener('click', handleCancelDeleteOutside);
    }
  };

  const handleConfirmDelete = () => {
    const newBeds = beds.filter((item) => item.id !== bedId);
    setBeds(newBeds);
    setIsDeleteModalVisible(false);
    navigate('/');
    document.body.removeEventListener('click', handleCancelDeleteOutside);
  };

  // make a method that checks if the add plants button has been clicked
  //  if the button is clicked it adds corresponding image to the gridItem
  // That was clicked.
  const AddingPlant =()=>{
    
  };
  const handleGridItemClick = (index) => {
    // Set the clicked item index in the state
    setClickedItemIndex(index);
  };
  return (
    <div>
      <header>
        <div className="backArrow">
          <Link to="/">
            <IoIosArrowBack /> Back
          </Link>
        </div>
        <h1>Edit Garden Bed</h1>

        {/* Pass setAddPlantsActive to SideBar */}
        <button
          className="btnSave"
          onClick={handleBed}
          style={{ marginRight: '10px' }}
        >
          Save Changes
        </button>
        <button className="btnDelete" onClick={handleDelete}>
          Delete Bed
        </button>
      </header>

      <div className="wholeBed">
        <input
          className="name"
          type="text"
          placeholder={nbed.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <input
          type="number"
          className="height"
          placeholder={nbed.gardenSize.height}
          value={height}
          onChange={handleHeightChange}
          autoFocus
        />

        {/* Pass setAddPlantsActive to SideBar */}
        <SideBar
          handleButtonClick={handleButtonClick}
          setAddPlantsActive={setAddPlantsActive}
          addPlantsActive={addPlantsActive}
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
          // Pass the clicked item index and handle function to GardenBed
          clickedItemIndex={clickedItemIndex}
          onGridItemClick={handleGridItemClick}
        />
      </div>

        <input
          className="width"
          type="number"
          placeholder={nbed.gardenSize.width}
          value={width}
          onChange={handleWidthChange}
          autoFocus
        />
      </div>
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
