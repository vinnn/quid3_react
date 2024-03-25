import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ViewTableButton = () => {
    let navigate = useNavigate();

    function handleClick() {
        navigate('/table')
    }

    return <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            onClick={handleClick}
            >
                View Tables
            </button>

}

export default ViewTableButton;

