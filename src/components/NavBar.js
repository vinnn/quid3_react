import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
// import ViewTableButton from "./ViewTableButton";
// import HomeButton from "./HomeButton";
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
                                <NavLink style={location.pathname === "/table" ? selectedTabStyle:{}} to="/table">Table</NavLink>
                            </li>
                            <li>
                                <NavLink style={location.pathname === "/create" ? selectedTabStyle:{}} to="/create">Create</NavLink>
                            </li>                        
                        </ul>
                    </nav>
                    <LogoutButton />
                </div>
            ) : (
                <div className="flex flex-row justify-center align-middle items-center">            
                    <LoginButton />
                </div>
            )}
        </div>
    )
}









// export default function NavBar() {

//     const { isAuthenticated, isLoading } = useAuth0();

//     console.log("in NavBar")    
//     console.log("window.location.pathname", window.location.pathname)

//     return (          
//         <div className="border-solid border-2 border-indigo-600">

//             {isAuthenticated ? ( 
//                 <div className="flex flex-row justify-between align-middle items-center">
//                     <Profile />
//                     <HomeButton />
//                     {window.location.pathname!="/table"?<ViewTableButton />:null}
//                     <LogoutButton />
//                 </div>
//             ) : (
//                 <div className="flex flex-row justify-center align-middle items-center">            
//                     <LoginButton />
//                 </div>
//             )}
//         </div>
//     )
// }



