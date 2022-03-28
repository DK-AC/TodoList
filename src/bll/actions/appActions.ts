import {SET_ERROR, SET_APP_STATUS} from "../types/appTypes";

export const setStatus = (appStatus: StatusType) => ({type: SET_APP_STATUS, appStatus }) as const
export const setError = (error: null | string) => ({type: SET_ERROR, error}) as const

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'