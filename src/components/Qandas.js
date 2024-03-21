import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../config"

const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;


const Qandas = () => {
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

                const response = await fetch(API_URL + "/qandas/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const response_json = await response.json();

                const resp_qandas = response_json[0]["qandas"] && response_json[1]==200? response_json[0]["qandas"] : []
                setQandas(resp_qandas);

            } catch (e) {               
                console.log(e.message);
            };
        };
        getData();

        }, [getAccessTokenSilently]);


        return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                {/* TABLE CAPTION */}
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    QANDAS
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All qandas listed.</p>
                </caption>

                {/* TABLE HEAD ROW */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-4"> 
                            <div className="flex items-center">
                                Category
                                {/* <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg
                                ></a> */}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3"> Q </th>
                        <th scope="col" className="px-6 py-3"> A </th>
                        <th scope="col" className="px-6 py-3"> Note </th>
                    </tr>
                </thead>

                {/* TABLE BODY ROWS */}
                <tbody>
                    {qandas ? (
                        qandas.map((qanda) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {qanda["category"]} </th>
                                <td className="px-6 py-2"> {qanda["question"]} </td>
                                <td className="px-6 py-2"> {qanda["answer"]} </td>
                                <td className="px-6 py-2"> {qanda["note"]} </td>
                            </tr>
                            ))
                        ) : (
                            "No qandas"
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Qandas;


