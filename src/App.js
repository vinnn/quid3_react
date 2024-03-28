import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./features/auth/LoginButton";
import AppNavBar from './routing/AppNavBar';
import Home from './routing/Home';
import Play from './routing/Play';
import Stats from './routing/Stats';
import Admin from './routing/Admin';
import Qandas from './routing/Qandas';
import NoMatch from './routing/NoMatch';
import Categories from "./routing/Categories";
import Games from "./routing/Games";
import Missions from './routing/Missions';
import Training from './routing/Training';
import { REACT_ROUTER_BASENAME } from "./config"

import useAuthListener from './features/auth/useAuthListener'
import { authState } from './features/auth/authSlice'
import { fetchQandas } from "./features/qandas/qandasSlice";
import { fetchCategories } from "./features/categories/categoriesSlice"; 
import { fetchGames } from "./features/games/gamesSlice"; 


function App() {
  const auth = useAuthListener()   // Listening if Auth state has changed
  const { isAuthenticated, isLoading } = useSelector(authState)

  // fetch data
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  useEffect( () => {
    if(isAuthenticated) {
        dispatch( fetchQandas(getAccessTokenSilently) )
        dispatch( fetchCategories(getAccessTokenSilently) )
        dispatch( fetchGames(getAccessTokenSilently) )
    }
  }, [isAuthenticated, getAccessTokenSilently])




  return (
    <div className="App">

      {isAuthenticated ? ( 
        <BrowserRouter basename={REACT_ROUTER_BASENAME}>

          <AppNavBar />

          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />}>
                      <Route path="missions" element={<Missions />} />
                      <Route path="training" element={<Training />} />
                      <Route path="*" element={<NoMatch />} />
                </Route>
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
