import {setIsInitializedAC} from "../actions/authActions";

export const SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN'
export const SET_IS_INITIALIZED = 'AUTH/SET_IS_INITIALIZED'

export type ActionsLoginType = ReturnType<typeof setIsInitializedAC>

export type AuthUserResponseType<D> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

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