import {SET_APP_ERROR, SET_APP_STATUS, SET_IS_INITIALIZED} from "../types/appTypes";

export const setAppStatus = (appStatus: StatusType) => ({type: SET_APP_STATUS, appStatus}) as const
export const setAppError = (error: null | string) => ({type: SET_APP_ERROR, error}) as const
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const


export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'