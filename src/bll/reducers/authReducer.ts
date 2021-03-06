import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isAuth, login, logout} from "../thunk/authThunk";

export const initialAuthState = {
    isInitialized: false,
    isLoggedIn: false
}

export const authSlices = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(isAuth.fulfilled, (state) => {
                state.isInitialized = true
            })
    }
})

export const {setIsLoggedInAC} = authSlices.actions

