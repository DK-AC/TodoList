import {AxiosResponse} from 'axios'
import {LoginValuesType, ResponseType, UserInfoType} from './types'
import {instance} from './instance'

export const authApi = {
  logIn(data: LoginValuesType) {
    return instance.post <LoginValuesType, AxiosResponse<ResponseType<{
      userId?: number
    }>>>('/auth/login', data)
  },
  me() {
    return instance.get<ResponseType<UserInfoType>>(`/auth/me`)
  },
  logOut() {
    return instance.delete<ResponseType>(`/auth/login`)
  }
}