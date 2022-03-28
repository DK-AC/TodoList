import {setAppError, setAppStatus} from "../actions/appActions";

export const SET_APP_STATUS = 'APP/SET_APP_STATUS'
export const SET_APP_ERROR = 'APP/SET_APP_ERROR'


export type ActionsAppType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>