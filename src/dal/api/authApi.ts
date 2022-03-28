import axios, {AxiosResponse} from "axios";
import {LoginValuesType, UserInfoType} from "../../bll/types/authTypes";
import {ResponseType} from "../../bll/types/taskTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const authApi = {
    logIn(data: LoginValuesType) {
        return instance.post <LoginValuesType, AxiosResponse<ResponseType<{ userId?: number }>>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType<UserInfoType>>(`/auth/me`)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}