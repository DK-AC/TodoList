import {setAppError, setAppStatus, setIsInitializedAC} from "../actions/appActions";

export const SET_APP_STATUS = 'APP/SET_APP_STATUS'
export const SET_APP_ERROR = 'APP/SET_APP_ERROR'
export const SET_IS_INITIALIZED = 'APP/SET_IS_INITIALIZED'


export type ActionsAppType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitializedAC>

export type AuthUserResponseType<D> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type UserInfoType = {
    id: number
    login: string
    email: string
}