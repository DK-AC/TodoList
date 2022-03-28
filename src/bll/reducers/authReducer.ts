import {ActionsLoginType, SET_IS_INITIALIZED} from "../types/authTypes";


const initialState = {
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsLoginType): InitialStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}