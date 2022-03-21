import {ActionsAppType, SET_STATUS} from "../types/appTypes";
import {StatusType} from "../actions/appActions";

const initialState = {
    status: 'idle' as StatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}