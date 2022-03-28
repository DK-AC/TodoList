import {ActionsAppType, SET_APP_ERROR, SET_APP_STATUS, SET_IS_INITIALIZED} from "../types/appTypes";
import {StatusType} from "../actions/appActions";

const initialState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.appStatus}
        case SET_APP_ERROR:
            return {...state, error: action.error}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}