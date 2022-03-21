import {ActionsAppType, CHANGE_IS_LOADING} from "../types/appTypes";

const initialState = {
    isLoading: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType) => {
    switch (action.type) {
        case CHANGE_IS_LOADING:
            return {...state, isLoading: true}
        default:
            return state
    }
}