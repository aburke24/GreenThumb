// Home.jsx
import React, { useState } from 'react';
import GardenBed from '../GardenBed Comp/GardenBed.jsx';
import './App.css';
import { MdAdd, MdClose } from 'react-icons/md';
import AddBedModal from '../components/AddBedModal';
import { Link } from 'react-router-dom';

const Home = ({ beds, setBeds }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleModalSave = (dimensions) => {
    setIsModalVisible(false);
    setBeds([...beds, dimensions]);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filteredBeds = beds.filter((bed) =>
    bed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Your Garden</h1>
        <div className="searchContainer">
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="Xbutton" onClick={() => setSearchTerm('')}>
            <MdClose size={20} />
          </button>
        </div>
      </header>
      <body>
      <div className="beds">
        {filteredBeds.map((bed, index) => (
          <Link
            key={index}
            to={{
              pathname: `/edit-bed/${bed.id}`,
              state: { bed, beds, setBeds },
            }}
          >
            <GardenBed 
              className = "Bedz"
              displayName={true}
              id={bed.id}
              name={bed.name}
              gardenSize={bed.gardenSize}
              plants={bed.plants}
              beds={beds}
              setBeds={setBeds}
              addPlantsActive={false}
              selectedButton={false}
              isBedCleared={false}
              setIsBedCleared={false}
              deletePlantActive={false}
              generateBed={false}
              isMainPage={true}
            />
          </Link>
        ))}
      </div>

      <div className="AddBed-Container">
        {!isModalVisible && (
          <button
            onClick={toggleModalVisibility}
            className="AddNewBed"
            style={{ backgroundColor: '#e74c3c' }}
          >
            <MdAdd size={30} color="white" />
          </button>
        )}
        {isModalVisible && (
          <AddBedModal onClose={toggleModalVisibility} onSave={handleModalSave} setBeds={setBeds} />
        )}
      </div>
      </body>
    </div>
    
  );
};

export default Home;
