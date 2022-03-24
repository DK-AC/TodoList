import {ActionsAppType, SET_ERROR, SET_STATUS} from "../types/appTypes";
import {StatusType} from "../actions/appActions";

const initialState = {
    status: 'idle' as StatusType,
    error: null as null | string
}

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}