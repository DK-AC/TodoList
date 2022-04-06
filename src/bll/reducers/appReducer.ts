import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatusType} from "../../dal/api/types";

export const initialAppState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string,
}

export const appSlices = createSlice({
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

export const {setAppStatusAC, setAppErrorAC} = appSlices.actions


