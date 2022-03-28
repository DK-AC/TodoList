import axios, {AxiosResponse} from "axios";
import {AuthUserResponseType, LoginValuesType, UserInfoType} from "../../bll/types/authTypes";
import {ResponseType} from "../../bll/types/taskTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const authApi = {
    login(data: LoginValuesType) {
        return instance.post <{ userId: string }, AxiosResponse<ResponseType<{ userId?: number }>>>('/auth/login', data)
    },
    me() {
        return instance.get<AuthUserResponseType<UserInfoType>>(`/auth/me`)
    }
}