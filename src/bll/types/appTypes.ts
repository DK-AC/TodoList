import {setAppErrorAC, setAppStatusAC} from "../actions/appActions";

export const SET_APP_STATUS = 'APP/SET_APP_STATUS'
export const SET_APP_ERROR = 'APP/SET_APP_ERROR'


export type ActionsAppType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'