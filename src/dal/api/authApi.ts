import axios from "axios";
import {LoginValuesType, MeResponseType} from "../../bll/types/authTypes";
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
        return instance.post <LoginValuesType, ResponseType<{ userId?: number }>>('/auth/login', data)
    },
    me() {
        return instance.get<MeResponseType>(`/auth/me`)
            .then(res => res.data)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}