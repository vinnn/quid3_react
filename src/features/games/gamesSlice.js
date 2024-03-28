import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../../config"
import axios from "axios";

const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;

const initialState = { 
    games: [],
    status: 'idle',
    error: null
}

export const fetchGames = createAsyncThunk('games/fetchGames', async (getAccessTokenSilently) => {    
    try {
        const accessToken = await getAccessTokenSilently({
            authorizationParams: {
                audience: API_AUDIENCE,
                scope: AUTH_SCOPE
            },
        });
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        const response = await axios.get(API_URL + "/games/", { headers })
        const response_data = await response.data[0]["games"];

        console.log("response_data", response_data)

        return response_data ? [...response_data] : []

    } catch (err) {
        return err.message;
    }
})

export const postNewGame = createAsyncThunk('games/postNewGame', async (postArgs) => {
    try {
        const { getAccessTokenSilently, body } = postArgs

        console.log("body", body)

        const accessToken = await getAccessTokenSilently({
            authorizationParams: {
                audience: API_AUDIENCE,
                scope: AUTH_SCOPE
            },
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        const response = await axios.post(API_URL + "/games/", body, { headers })

        console.log("response", response)

        if (response.data[1] === 200) {
            return response.data
        }

    } catch (err) {
        return err.message;
    }
})

export const deleteGame = createAsyncThunk('games/deleteGame', async (deleteArgs) => {
    try {
        const { getAccessTokenSilently, id } = deleteArgs

        const accessToken = await getAccessTokenSilently({
            authorizationParams: {
                audience: API_AUDIENCE,
                scope: AUTH_SCOPE
            },
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        const response = await axios.delete(API_URL + "/games/" + id, { headers })
        if (response.data[1] === 200) {
            return response.data
        }

    } catch (err) {
        return err.message;
    }
})


const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        // qandasAdded: {
        //     reducer(state, action){
        //         // push would normally mutate the array BUT not in createSlice. 
        //         // createSlice is using immerjs, which mutates the state underneath
        //         state.qandas.push(action.payload)
        //     },
        //     // prepare callback for the postAdded reducer function, that prepares the 
        //     // payload for the reducer
        //     prepare(question, answer, note, category_id) {
        //         return {
        //             payload: { id: nanoid(), question, answer, note, category_id }
        //         }
        //     }
        // }
        selectGame: {
            reducer(state, action){
                state.games = state.games.map((q) => (q.id==action.payload)? {...q, "selected": !q.selected } : q )
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGames.pending, (state, action) => {
                console.log('loading')
                state.status = 'loading'
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                console.log("state.games", state.games)   
                state.status = 'succeeded'
                state.games = action.payload.map(game => {
                    return {...game, "selected": false};
                });
            })
            .addCase(fetchGames.rejected, (state, action) => {
                console.log('failed')
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postNewGame.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                console.log("state.games", state.games)           
                if (action.payload && action.payload[0].game) {
                    const new_game = action.payload[0].game
                    state.games.push({
                        "id": new_game.id,
                        "name": new_game.name,
                        "qanda_ids": new_game.qanda_ids,
                        "extra_qandas": new_game.extra_qandas
                    })
                }
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                if (action.payload && action.payload[0].id) {
                    state.games = state.games.filter((q) => q.id !== action.payload[0].id)
                }
            })
    }
})

export const getAllGames = (state) => state.games.games
export const getGamesStatus = (state) => state.games.status
export const getGamesError = (state) => state.games.error

export const { selectGame } = gamesSlice.actions

export default gamesSlice.reducer

