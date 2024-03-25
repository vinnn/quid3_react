import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_ROUTER_BASENAME } from "../../config"

const REACT_APP_REDIRECT_URI=window.location.origin + REACT_ROUTER_BASENAME

const ButtonNewQanda = () => {


    return (
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded mx-2" 
            onClick={() => {}}
        >
            New Qanda
        </button>
    );
};

export default ButtonNewQanda;
