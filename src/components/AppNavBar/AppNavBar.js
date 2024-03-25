import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useLocation } from "react-router-dom";

import { useSelector } from 'react-redux';


export default function AppNavBar() {

    // const { isAuthenticated } = useAuth0();
    const { isAuthenticated, isLoading } = useSelector(state=>state.auth)

    const setLinkActiveStyle = (isActive) => {
        return {
          fontWeight: isActive ? "700" : "",
          color: isActive ? "blue" : "black",
        };
    }

    return (          
        <div className="border-solid border-2 border-indigo-600">

            {isAuthenticated ? ( 
                <div className="flex flex-row justify-between align-middle items-center">
                    <Profile />
                    <nav variant="pills" className="navbar" style={{ borderBottom: "1px solid white" }}>
                        <ul className="nav nav-pills flex flex-row gap-3">
                            <li>
                                <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="/play">Play</NavLink>
                            </li>
                            <li>
                                <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="/stats">Stats</NavLink>
                            </li>                            
                            <li>
                                <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="/admin">Admin</NavLink>
                            </li>                      
                        </ul>
                    </nav>
                    <LogoutButton />
                </div>
            ) : null }

        </div>
    )
}




