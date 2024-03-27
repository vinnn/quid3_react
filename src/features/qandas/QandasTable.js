import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllQandas, getQandasStatus, getQandasError, deleteQanda } from "./qandasSlice";
import { useSelector, useDispatch } from "react-redux";

import Table from "../../components/Table"


const QandasTable = () => {
    const qandas = useSelector(getAllQandas)
    const status = useSelector(getQandasStatus)
    const errors = useSelector(getQandasError)

    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    const handleDeleteRow = (e) => {
        const delete_args = {
            "getAccessTokenSilently": getAccessTokenSilently,
            "id": e.target.id
        }
        dispatch(deleteQanda(delete_args))
    }

    return (        
        <Table headList={["Category", "Q", "A", "Note"]} dataList={qandas} dataKeysList={["category name", "question", "answer", "note"]} status={status} handleDeleteRow={handleDeleteRow}/>
    )
}

export default QandasTable



