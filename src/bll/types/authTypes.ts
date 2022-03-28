import {setIsInitializedAC} from "../actions/authActions";

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
}

export type UserInfoType = {
    id: number
    login: string
    email: string
}