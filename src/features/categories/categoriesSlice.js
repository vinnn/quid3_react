import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_API_SERVER_URL } from "../../config"
import axios from "axios";

const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_URL = REACT_APP_API_SERVER_URL;

const initialState = { 
    categories: [],
    status: 'idle',
    error: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (getAccessTokenSilently) => {    
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
        const response = await axios.get(API_URL + "/categories/", { headers })
        console.log("response", response)

        const response_data = await response.data[0]["categories"];
        console.log("response_data", response_data)

        return [...response_data]
    } catch (err) {
        return err.message;
    }
})

export const postNewCategory = createAsyncThunk('categories/postNewCategory', async (postArgs) => {
    try {
        const { getAccessTokenSilently, body } = postArgs

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
        const response = await axios.post(API_URL + "/categories/", body, { headers })
        console.log("response.data", response.data)

        return response.data
    } catch (err) {
        return err.message;
    }
})








const categoriesSlice = createSlice({
    name: "categories",
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
            .addCase(fetchCategories.pending, (state, action) => {
                console.log('loading')
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = action.payload.map(category => {
                    return category;
                });
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.log('failed')
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postNewCategory.fulfilled, (state, action) => {
                console.log("lklk", action.payload)
                state.categories.push(action.payload[0].category)

                // action.payload.userId = Number(action.payload.userId)
                // action.payload.date = new Date().toISOString();
                // // since the 'mock' api we are using is not returning 
                // // reactions, we are giving that here:
                // action.payload.reactions = { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
                // console.log(action.payload)
                // state.posts.push(action.payload)




            })
    }
})

export const getAllCategories = (state) => state.categories.categories
export const getCategoriesStatus = (state) => state.categories.status
export const getCategoriesError = (state) => state.categories.error

// export const { categoriesAdded } = categoriesSlice.actions

export default categoriesSlice.reducer

