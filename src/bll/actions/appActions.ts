import {SET_ERROR, SET_STATUS} from "../types/appTypes";

export const setStatus = (status: StatusType) => ({type: SET_STATUS, status}) as const
export const setError = (error: null | string) => ({type: SET_ERROR, error}) as const

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'