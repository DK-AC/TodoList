import {ActionsAppType, SET_ERROR, SET_APP_STATUS} from "../types/appTypes";
import {StatusType} from "../actions/appActions";

const initialState = {
    appStatus: 'idle' as StatusType,
    error: null as null | string
}

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, appStatus: action.appStatus}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}