import React, { useState } from 'react';
import'./Styles.css';

const Grid = ({ size }) => {
  const cellSize = 30; // Adjust the cell size as needed
  const rows = size;
  const cols = size;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    border: '1px solid #281f1f', // Border color
  };

  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    border: '1px solid #281f1f', // Inner line color
  };

  return (
    <div style={gridStyle}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <div key={index} style={cellStyle}></div>
      ))}
    </div>
  );
};

const App = () => {
  const [gridSize, setGridSize] = useState(5); // Initial size

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setGridSize(newSize);
  };
  
  const handleClick = () =>{
    console.log("Clicked!!");
  }
  
  return (
    <div onClick={handleClick}>
      <label>
        Grid Size:
        <input
          type="number"
          value={gridSize}
          onChange={handleSizeChange}
          min="1"
        />
      </label>
      <Grid size={gridSize} />
    </div>
  );
};

export default App;
