import {CHANGE_IS_LOADING} from "../types/appTypes";

export const changeIsLoading = (status: StatusType) => ({type: CHANGE_IS_LOADING, status}) as const

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'