import {ActionsAppType, SET_APP_ERROR, SET_APP_STATUS, StatusType} from "../types/appTypes";

const initialAppState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string,
}

export type InitialAppStateType = typeof initialAppState

export const appReducer = (state = initialAppState, action: ActionsAppType): InitialAppStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.appStatus}
        case SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}