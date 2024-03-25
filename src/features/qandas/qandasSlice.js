import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../../config"
import axios from "axios";

const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;

const initialState = { 
    qandas: [],
    status: 'idle',
    error: null
}

export const fetchQandas = createAsyncThunk('qandas/fetchQandas', async (getAccessTokenSilently) => {    
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
        const response = await axios.get(API_URL + "/qandas/", { headers })
        const response_data = await response.data[0]["qandas"];
        return [...response_data]
    } catch (err) {
        return err.message;
    }
})


const qandasSlice = createSlice({
    name: "qandas",
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
    },
    extraReducers(builder) {
        builder
            // .addCase(fetchQandas.pending, (state, action) => {
            //     console.log('loading')
            //     state.status = 'loading'
            // })
            .addCase(fetchQandas.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.qandas = action.payload.map(qanda => {
                    return qanda;
                });
            })
            // .addCase(fetchQandas.rejected, (state, action) => {
            //     console.log('failed')
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
            // .addCase(postNewQanda.fulfilled, (state, action) => {
            //     console.log(action.payload)
            //     state.posts.push(action.payload)
            // })
    }
})

export const getAllQandas = (state) => state.qandas.qandas
export const getQandasStatus = (state) => state.qandas.status
export const getQandasError = (state) => state.qandas.error

export const { qandasAdded } = qandasSlice.actions

export default qandasSlice.reducer

