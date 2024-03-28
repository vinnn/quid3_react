import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllQandas, getQandasStatus, getQandasError, selectQanda, deleteQanda } from "./qandasSlice";
import { getAllCategories } from "../categories/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";


import Table from "../../components/Table"


const QandasTable = () => {
    const qandas = useSelector(getAllQandas)
    const status = useSelector(getQandasStatus)
    const errors = useSelector(getQandasError)
    const categories = useSelector(getAllCategories)


    console.log("QandasTable qandas", qandas)

    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    const dataList = qandas.map((q) => { 
        const category = categories.filter((c) => c.id === q.category_id)
        if (category.length === 0) {
            return q
        }
        return {...q,
            "category_name": categories.filter((c) => c.id === q.category_id)[0].name ?? ''
        }
    })

    const handleSelectRow = (e) => {
        console.log("select checkbox, e", e)
        dispatch(selectQanda(e.target.id))
    }

    const handleDeleteRow = (e) => {
        const delete_args = {
            "getAccessTokenSilently": getAccessTokenSilently,
            "id": e.target.id
        }
        dispatch(deleteQanda(delete_args))
    }






    return (        
        <Table headList={["Category", "Q", "A", "Note", "id"]} dataList={dataList} dataKeysList={["category_name", "question", "answer", "note", "id"]} status={status} handleSelectRow={handleSelectRow} handleDeleteRow={handleDeleteRow}/>
    )
}

export default QandasTable



