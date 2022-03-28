import {SET_IS_INITIALIZED} from "../types/authTypes";

export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized}) as const