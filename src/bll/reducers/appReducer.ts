import {ActionsAppType, SET_APP_ERROR, SET_APP_STATUS, StatusType} from "../types/appTypes";

const initialState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string,
}

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.appStatus}
        case SET_APP_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}