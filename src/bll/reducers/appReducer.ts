import {StatusType} from "../types/appTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialAppState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string,
}

export const slice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ appStatus: StatusType }>) {
            state.appStatus = action.payload.appStatus
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC} = slice.actions


