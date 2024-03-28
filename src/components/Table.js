// import { deleteQanda } from "../features/qandas/qandasSlice";
// import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
// import { selectQanda } from '../features/qandas/qandasSlice'

const Table = ( { headList, dataList, dataKeysList, status, handleSelectRow, handleDeleteRow } ) => {

    const dispatch = useDispatch();
    // const { getAccessTokenSilently } = useAuth0();


    console.log("dataList", dataList)
    console.log("dataKeysList", dataKeysList)

    headList = ["", ...headList, ""]

    // const handleDeleteRow = (e) => {
    //     const delete_args = {
    //         "getAccessTokenSilently": getAccessTokenSilently,
    //         "id": e.target.id
    //     }
    //     dispatch(deleteQanda(delete_args))
    // }

    // const handleSelectRow = (e) => {
    //     console.log("select checkbox, e", e)
    //     dispatch(selectQanda(e.target.id))
    // }




    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                {/* TABLE CAPTION */}
                {/* <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    QANDAS
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All qandas listed.</p>
                </caption> */}

                {/* TABLE HEAD ROW */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headList ? (
                            headList.map((head, i) => (
                                <th key={i} scope="col" className="px-6 py-2"> {head} </th>
                            ))
                        ) : (
                            null
                        )}
                    </tr>
                </thead>

                {/* TABLE BODY ROWS */}
                <tbody>
                    {dataList && status === "succeeded" ? (
                        dataList.map((data, i) => (
                        
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {data[dataKeysList[0]]} </th> */}


                                {/* checkbox */}
                                <td className="pl-6 w-8">

                                    <input type="checkbox" id={data.id} name="selection" value="selection" onChange={handleSelectRow} checked={data.selected} />
                                    {/* <label for="coding">Coding</label> */}

                                    {/* <label className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                                        <path
                                            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                            data-name="7-Check" data-original="#000000" />
                                        </svg>
                                        <input id={data.id} type="checkbox" className="hidden peer" onClick={handleSelectCheckRow} />
                                    </label> */}
                                </td>

                                {/* data */}
                                {dataKeysList.map((key,i) => (
                                    <td key={i} className="px-6 py-2"> 
                                        {data[key]} 
                                        
                                    </td>
                                ))}

                                    <td key={i} className="font-medium text-blue-600 dark:text-blue-500 hover:font-bold" onClick={handleDeleteRow} id={data.id}>
                                        delete
                                    </td>
                            </tr>
                            ))
                        ) : (
                           <tr><th>No data</th></tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Table

