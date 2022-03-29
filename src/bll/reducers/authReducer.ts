import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialAuthState = {
    isInitialized: false,
    isLoggedIn: false
}

export const slice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer

export const {setIsLoggedInAC, setIsInitializedAC} = slice.actions

