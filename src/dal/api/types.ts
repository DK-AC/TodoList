import {FieldErrorType} from "../../bll/types/taskTypes";

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

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}