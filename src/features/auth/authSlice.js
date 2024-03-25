import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
            state.isLoading = action.payload.isLoading
            state.user = action.payload.user            
        }
    }
})

// export variables ready to be consumed elsewhere by selectors 
export const authState = (state) => state.auth;
// export slice actions and reducers
export const { setAuthState } = authSlice.actions
export default authSlice.reducer
