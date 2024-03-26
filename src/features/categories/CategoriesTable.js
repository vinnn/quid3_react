import React from "react";

import { getAllCategories, getCategoriesStatus, getCategoriesError } from "./categoriesSlice";
import { useSelector } from "react-redux";

import Table from "../../components/Table"


const CategoriesTable = () => {
    const data = useSelector(getAllCategories)
    const status = useSelector(getCategoriesStatus)
    const errors = useSelector(getCategoriesError)

    return (        
        <Table headList={["Category", "id"]} dataList={data} dataKeysList={["name", "id"]} status={status} />
    )
}

export default CategoriesTable

