import {SET_STATUS} from "../types/appTypes";

export const setStatus = (status: StatusType) => ({type: SET_STATUS, status}) as const

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'