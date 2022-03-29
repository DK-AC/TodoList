import {Dispatch} from "redux";
import {authApi} from "../../dal/api/authApi";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {LoginValuesType} from "../types/authTypes";
import {setIsInitializedAC, setIsLoggedInAC} from "../reducers/authReducer";
import {setAppStatusAC} from "../reducers/appReducer";

export const logInTC = (data: LoginValuesType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    authApi.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}
export const isAuthTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
            } else {
            }
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}))
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}