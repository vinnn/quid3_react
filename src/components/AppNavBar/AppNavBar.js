import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import LogoutButton from "../../features/auth/LogoutButton";
import UserProfile from "../../features/auth/UserProfile";
import { authState } from "../../features/auth/authSlice"


export default function AppNavBar() {
    const { isAuthenticated, isLoading } = useSelector(authState)

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
                    <UserProfile />
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




