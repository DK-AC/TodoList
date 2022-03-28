import {ActionsAuthType, SET_IS_INITIALIZED, SET_IS_LOGGED_IN} from "../types/authTypes";


const initialAuthState = {
    isInitialized: false,
    isLoggedIn: false
}

export type InitialAuthStateType = typeof initialAuthState

export const authReducer = (state = initialAuthState, action: ActionsAuthType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}