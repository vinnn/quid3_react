import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../config"


// const API_AUDIENCE = process.env.REACT_APP_API_AUDIENCE;
// const AUTH_SCOPE = process.env.REACT_APP_AUTH0_SCOPE;
// const API_URL = process.env.REACT_APP_API_SERVER_URL


const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;

const Content = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [qandas, setQandas] = useState(null);

    useEffect(() => {
        const getData = async () => {

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: API_AUDIENCE,
                        scope: AUTH_SCOPE
                    },
                });

                console.log("tok", accessToken)

                const response = await fetch(API_URL + "/qandas/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const response_json = await response.json();
                console.log("response_json", response_json)

                setQandas(response_json);

            } catch (e) {               
                console.log(e.message);
            };
        };
        getData();

        }, [getAccessTokenSilently]);

    return (
            <div>
                <h3>qandas data</h3>
                {qandas ? (
                    <pre>{JSON.stringify(qandas, null, 2)}</pre>
                ) : (
                    "No qandas"
                )}
            </div>
    )
}

export default Content;

