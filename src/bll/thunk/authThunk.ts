import {Dispatch} from "redux";
import {authApi} from "../../dal/api/authApi";
import {setAppStatus} from "../actions/appActions";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setIsInitializedAC, setIsLoggedInAC} from "../actions/authActions";
import {LoginValuesType} from "../types/authTypes";

export const logInTC = (data: LoginValuesType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    authApi.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const isAuthTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
            dispatch(setIsInitializedAC(true))
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatus("succeeded"))
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}