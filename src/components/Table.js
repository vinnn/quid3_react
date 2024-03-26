
const Table = ( { headList, dataList, dataKeysList, status } ) => {

    console.log("dataList", dataList)
    console.log("dataKeysList", dataKeysList)

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
                                <th scope="col" className="px-6 py-2"> {head} </th>
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
                                {dataKeysList.map((key,i) => (
                                    <td key={i} className="px-6 py-2"> {data[key]} </td>
                                ))}
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

