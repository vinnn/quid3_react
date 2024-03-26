import React from "react";

import { getAllQandas, getQandasStatus, getQandasError } from "./qandasSlice";
import { useSelector } from "react-redux";

import Table from "../../components/Table"


const QandasTable = () => {
    const qandas = useSelector(getAllQandas)
    const qandasStatus = useSelector(getQandasStatus)
    const qandasErrors = useSelector(getQandasError)

    return (        
        <Table headList={["Category", "Q", "A", "Note"]} dataList={qandas} dataKeysList={["category", "question", "answer", "note"]} status={qandasStatus} />
    )
}

export default QandasTable

