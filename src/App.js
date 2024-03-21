import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Play from './components/Play';
import Stats from './components/Stats';
import Admin from './components/Admin';
import Qandas from './components/Qandas';
import NoMatch from './components/NoMatch';
import Profile from "./components/Profile";
import Categories from "./components/Categories";
import Games from "./components/Games";
import LogoutButton from "./components/LogoutButton";
import { REACT_ROUTER_BASENAME } from "./config"


function App() {

  const { isAuthenticated } = useAuth0();
  // let location = useLocation();

  let selectedTabStyle = {
    // visibility: 'hidden'
    'fontWeight': '900',
    'color': 'blue'
 }


  // <Route path=  ** omit the '/' for relative paths
  // nested routes under /admin:
  //    associated element will be rendered where a <Outlet> is included (as long as it is included within the element of the parent route, ie <Admin>)(I)


  return (
    <div className="App">

      {isAuthenticated ? ( 
        <BrowserRouter basename={REACT_ROUTER_BASENAME}>
          <NavBar />

          {/* <div className="flex flex-row justify-between align-middle items-center">
            <Profile />
            <nav variant="pills" className="navbar" style={{ borderBottom: "1px solid white" }}>

                <ul className="nav nav-pills flex flex-row gap-3">
                    <li> <NavLink style={location.pathname === "/" ? selectedTabStyle:{}} to="/">Home</NavLink> </li>
                    <li> <NavLink style={location.pathname === "/play" ? selectedTabStyle:{}} to="/play">Play</NavLink> </li>
                    <li> <NavLink style={location.pathname === "/stats" ? selectedTabStyle:{}} to="/stats">Stats</NavLink> </li>                            
                    <li> <NavLink style={location.pathname === "/admin" ? selectedTabStyle:{}} to="/admin">Admin</NavLink> </li>                      
                </ul>

            </nav>
            <LogoutButton />
          </div> */}


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
