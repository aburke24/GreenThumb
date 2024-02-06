// App.jsx -- app name suggestion ---- Green Thumb ----
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EditBed from './Pages/EditBed';

import { useEffect, useState } from 'react';

const App = () => {
  const [beds, setBeds] = useState(JSON.parse(localStorage.getItem('beds')) || [] );

  useEffect(() => {
    localStorage.setItem('beds', JSON.stringify(beds))
  },[beds])

 
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home beds = {beds} setBeds={setBeds} />} />
          <Route path="/edit-bed/:id" element={<EditBed beds= {beds} setBeds={setBeds}/>} />
         
        </Routes>
      </BrowserRouter>
  );
};

export default App;