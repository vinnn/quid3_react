import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_ROUTER_BASENAME } from "../../config"

const REACT_APP_REDIRECT_URI=window.location.origin + REACT_ROUTER_BASENAME

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" 
            onClick={() => logout({
            logoutParams: { returnTo: REACT_APP_REDIRECT_URI } //
         })}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
