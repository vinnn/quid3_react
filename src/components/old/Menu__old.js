import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import Content from "./Content";
import Create from "./Create";

const Menu = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();


    return (
        isAuthenticated && (
            <>
                {/* <Content /> */}
                {/* <Create /> */}
            </>
        )
    )
}

export default Menu;

