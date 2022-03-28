import {ActionsLoginType, SET_IS_INITIALIZED, SET_IS_LOGGED_IN} from "../types/authTypes";


const initialState = {
    isInitialized: false,
    isLoggedIn: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsLoginType): InitialStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}