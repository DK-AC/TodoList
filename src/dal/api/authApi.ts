import axios from "axios";
import {AuthUserResponseType, UserInfoType} from "../../bll/types/authTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const authApi = {
    me() {
        return instance.get<AuthUserResponseType<UserInfoType>>(`/auth/me`)
    },
}