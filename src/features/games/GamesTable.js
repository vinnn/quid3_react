import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllGames, getGamesStatus, getGamesError, selectGame, deleteGame } from "./gamesSlice";
import { getAllCategories } from "../categories/categoriesSlice";
import { useSelector, useDispatch } from "react-redux";


import Table from "../../components/Table"


const GamesTable = () => {
    const games = useSelector(getAllGames)
    const status = useSelector(getGamesStatus)
    const errors = useSelector(getGamesError)
    // const categories = useSelector(getAllCategories)


    console.log("GamesTable games", games)

    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();

    const dataList = games.map((g) => ({...g, "nb_qandas": g.qanda_ids.length }))

    const handleSelectRow = (e) => {
        console.log("select checkbox, e", e)
        dispatch(selectGame(e.target.id))
    }

    const handleDeleteRow = (e) => {
        const delete_args = {
            "getAccessTokenSilently": getAccessTokenSilently,
            "id": e.target.id
        }
        dispatch(deleteGame(delete_args))
    }






    return (        
        <Table headList={["ID", "Name", "qandas", "extra"]} dataList={dataList} dataKeysList={["id", "name", "nb_qandas", "extra_qandas"]} status={status} handleSelectRow={handleSelectRow} handleDeleteRow={handleDeleteRow}/>
    )
}

export default GamesTable



