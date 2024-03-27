import { NavLink, useLocation } from "react-router-dom";


export default function AdminNavBar() {

    const setLinkActiveStyle = (isActive) => {
        return {
          fontWeight: isActive ? "700" : "",
          color: isActive ? "blue" : "black",
        };
    }

    return (          
        <div className="py-3 mx-3">

            <div className="flex flex-row justify-between align-middle items-center">

                <nav variant="pills" className="navbar" style={{ borderBottom: "1px solid white" }}>
                    <ul className="nav nav-pills flex flex-row gap-3">
                        <li>
                            <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="categories">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="qandas">Qandas</NavLink>
                        </li>                        
                        <li>
                            <NavLink style={({ isActive }) => setLinkActiveStyle(isActive)} to="games">Games</NavLink>
                        </li>                            
                
                    </ul>
                </nav>



            </div>
        </div>
    )
}


