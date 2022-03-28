import {SET_IS_INITIALIZED, SET_IS_LOGGED_IN} from "../types/authTypes";

export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: SET_IS_LOGGED_IN, isLoggedIn}) as const

