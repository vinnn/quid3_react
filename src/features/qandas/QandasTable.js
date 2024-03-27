import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllQandas, getQandasStatus, getQandasError, deleteQanda } from "./qandasSlice";
import { getAllCategories } from "../categories/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";

import Table from "../../components/Table"


const QandasTable = () => {
    const qandas = useSelector(getAllQandas)
    const status = useSelector(getQandasStatus)
    const errors = useSelector(getQandasError)
    const categories = useSelector(getAllCategories)

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

    const handleDeleteRow = (e) => {
        const delete_args = {
            "getAccessTokenSilently": getAccessTokenSilently,
            "id": e.target.id
        }
        dispatch(deleteQanda(delete_args))
    }

    return (        
        <Table headList={["Category", "Q", "A", "Note", "id"]} dataList={dataList} dataKeysList={["category_name", "question", "answer", "note", "id"]} status={status} handleDeleteRow={handleDeleteRow}/>
    )
}

export default QandasTable



