import {setIsInitializedAC, setIsLoggedInAC} from "../actions/authActions";
import {ResponseType} from "./taskTypes";

export const SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN'
export const SET_IS_INITIALIZED = 'AUTH/SET_IS_INITIALIZED'

export type ActionsAuthType = ReturnType<typeof setIsInitializedAC> | ReturnType<typeof setIsLoggedInAC>

export type LoginValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type UserInfoType = {
    id: number
    login: string
    email: string
}

export type MeResponseType = ResponseType<UserInfoType>