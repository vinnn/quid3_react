import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        user: null
    },
    reducers: {
        setAuthState: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.isLoading = action.payload.isLoading
            state.user = action.payload.user
        }
    }
})

// !!!!!!!       EXPORT THE SLICE ACTIONS ==>  in setAuthSlice:
export const {setAuthState} = authSlice.actions 
// !!!!!!!       EXPORT THE SLICE REDUCER ==>  in authSlice:
export default authSlice.reducer                

