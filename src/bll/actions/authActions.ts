import {LoginValuesType, SET_IS_INITIALIZED, SET_IS_LOGGED_IN} from "../types/authTypes";

export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const
export const setIsLoggedInAC = (data: LoginValuesType) => ({type: SET_IS_LOGGED_IN, data}) as const
