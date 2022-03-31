import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {logInTC, logOutTC} from "../thunk/authThunk";

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
    },
    extraReducers: (builder) => {
        builder.addCase(logInTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logOutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer

export const {setIsLoggedInAC, setIsInitializedAC} = slice.actions

