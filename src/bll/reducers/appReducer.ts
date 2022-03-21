import {ActionsAppType, CHANGE_IS_LOADING} from "../types/appTypes";

const initialState = {
    isLoading: 'idle'
}

type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case CHANGE_IS_LOADING:
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}