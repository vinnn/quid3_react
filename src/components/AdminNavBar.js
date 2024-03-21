import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useLocation } from "react-router-dom";


export default function AdminNavBar() {

    let location = useLocation();

    let selectedTabStyle = {
        // visibility: 'hidden'
        'fontWeight': '900',
        'color': 'blue'
     }


    return (          
        <div className="py-10">

                <div className="flex flex-row justify-between align-middle items-center">

                    <nav variant="pills" className="navbar" style={{ borderBottom: "1px solid white" }}>
                        <ul className="nav nav-pills flex flex-row gap-3">
                            <li>
                                <NavLink style={location.pathname === "/admin/qandas" ? selectedTabStyle:{}} to="/admin/qandas">Qandas</NavLink>
                            </li>
                            <li>
                                <NavLink style={location.pathname === "/admin/categories" ? selectedTabStyle:{}} to="/admin/categories">Categories</NavLink>
                            </li>
                            <li>
                                <NavLink style={location.pathname === "/admin/games" ? selectedTabStyle:{}} to="/admin/games">Games</NavLink>
                            </li>                            
                    
                        </ul>
                    </nav>

                </div>

        </div>
    )
}


