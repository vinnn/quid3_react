import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Shop from './components/Shop';


// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>

      
      </BrowserRouter>

    </div>
  );
}

export default App;
