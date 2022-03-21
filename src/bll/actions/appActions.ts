import {CHANGE_IS_LOADING} from "../types/appTypes";

export const changeIsLoading = (isLoading: IsLoadingType) => ({type: CHANGE_IS_LOADING, isLoading}) as const

export type IsLoadingType = 'idle' | 'loading' | 'successful' | 'fail'