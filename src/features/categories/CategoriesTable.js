import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllCategories, getCategoriesStatus, getCategoriesError, selectCategory, deleteCategory } from "./categoriesSlice";
import { useSelector, useDispatch } from "react-redux";

import Table from "../../components/Table"


const CategoriesTable = () => {
    const categories = useSelector(getAllCategories)
    const status = useSelector(getCategoriesStatus)
    const errors = useSelector(getCategoriesError)

    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    const dataList = categories

    const handleSelectRow = (e) => {
        console.log("select checkbox, e", e)
        dispatch(selectCategory(e.target.id))
    }

    const handleDeleteRow = (e) => {
        const delete_args = {
            "getAccessTokenSilently": getAccessTokenSilently,
            "id": e.target.id
        }
        dispatch(deleteCategory(delete_args))
    }


    return (        
        <Table headList={["Category", "id"]} dataList={dataList} dataKeysList={["name", "id"]} status={status} handleSelectRow={handleSelectRow} handleDeleteRow={handleDeleteRow} />
    )
}

export default CategoriesTable

