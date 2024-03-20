import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Play from './components/Play';
import Stats from './components/Stats';
import Table from './components/Table';
import Create from './components/Create';
import { REACT_ROUTER_BASENAME } from "./config"


function App() {
  return (
    <div className="App">

      <BrowserRouter basename={REACT_ROUTER_BASENAME}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/table" element={<Table />} />
          <Route path="/create" element={<Create />} />
        </Routes>

      
      </BrowserRouter>

    </div>
  );
}

export default App;
