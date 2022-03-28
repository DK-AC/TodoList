import {SET_APP_ERROR, SET_APP_STATUS, StatusType} from "../types/appTypes";

export const setAppStatusAC = (appStatus: StatusType) => ({type: SET_APP_STATUS, appStatus}) as const
export const setAppErrorAC = (error: null | string) => ({type: SET_APP_ERROR, error}) as const



