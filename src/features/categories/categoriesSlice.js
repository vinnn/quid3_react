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
        const response_data = await response.data[0]["categories"];
        return response_data ? [...response_data] : []

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
        if (response.data[1] === 200) {
            return response.data
        }

    } catch (err) {
        return err.message;
    }
})

export const deleteCategory = createAsyncThunk('qandas/deleteCategory', async (deleteArgs) => {
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
        const response = await axios.delete(API_URL + "/categories/" + id, { headers })
        if (response.data[1] === 200) {
            return response.data
        }

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
                console.log("action.payload", action.payload)
                if (action.payload) {
                    state.categories.push(action.payload[0].category)
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                if (action.payload && action.payload[0].id) {
                    state.categories = state.categories.filter((q) => q.id != action.payload[0].id)
                }
            })            
    }
})

export const getAllCategories = (state) => state.categories.categories
export const getCategoriesStatus = (state) => state.categories.status
export const getCategoriesError = (state) => state.categories.error

// export const { categoriesAdded } = categoriesSlice.actions

export default categoriesSlice.reducer

