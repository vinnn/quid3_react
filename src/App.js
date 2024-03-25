import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginButton from "./features/auth/LoginButton";
import AppNavBar from './components/AppNavBar/AppNavBar';
import Home from './components/Home/Home';
import Play from './components/Play/Play';
import Stats from './components/Stats/Stats';
import Admin from './components/Admin/Admin';
import Qandas from './components/Admin/Qandas';
import NoMatch from './components/NoMatch';
import Categories from "./components/Admin/Categories";
import Games from "./components/Admin/Games";
import { REACT_ROUTER_BASENAME } from "./config"

import useAuthListener from './features/auth/useAuthListener'
import { authState } from './features/auth/authSlice'


function App() {
  const auth = useAuthListener()   // Listening if Auth state has changed
  const { isAuthenticated, isLoading } = useSelector(authState)

  return (
    <div className="App">

      {isAuthenticated ? ( 
        <BrowserRouter basename={REACT_ROUTER_BASENAME}>

          <AppNavBar />

          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/admin" element={<Admin />}>
                      <Route path="qandas" element={<Qandas />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="games" element={<Games />} />
                      <Route path="*" element={<NoMatch />} />
                </Route>
                <Route path="*" element={<NoMatch />} />
          </Routes>
        
        </BrowserRouter>
      ) : (
        <div className="flex flex-row justify-center align-middle items-center">            
          <LoginButton />
        </div>
      )}

    </div>
  );
}

export default App;


// NOTES::
// <Route path=  ** omit the '/' for relative paths
// nested routes under /admin:
//    associated element will be rendered where a <Outlet> is included (as long as it is included within the element of the parent route, ie <Admin>)(I)
