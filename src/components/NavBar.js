import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useLocation } from "react-router-dom";


export default function NavBar() {

    const { isAuthenticated } = useAuth0();
    let location = useLocation();

    let selectedTabStyle = {
        // visibility: 'hidden'
        'fontWeight': '900',
        'color': 'blue'
     }

    return (          
        <div className="border-solid border-2 border-indigo-600">

            {isAuthenticated ? ( 
                <div className="flex flex-row justify-between align-middle items-center">
                    <Profile />
                    <nav variant="pills" className="navbar" style={{ borderBottom: "1px solid white" }}>
                        <ul className="nav nav-pills flex flex-row gap-3">
                            <li>
                                <NavLink style={location.pathname === "/" ? selectedTabStyle:{}} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink style={location.pathname === "/play" ? selectedTabStyle:{}} to="/play">Play</NavLink>
                            </li>
                            <li>
                                <NavLink style={location.pathname === "/stats" ? selectedTabStyle:{}} to="/stats">Stats</NavLink>
                            </li>                            
                            <li>
                                <NavLink style={location.pathname === "/admin" ? selectedTabStyle:{}} to="/admin">Admin</NavLink>
                            </li>                      
                        </ul>
                    </nav>
                    <LogoutButton />
                </div>
            ) : null }

        </div>
    )
}




