import {Dispatch} from "redux";
import {authApi} from "../../dal/api/authApi";
import {setAppStatusAC} from "../actions/appActions";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setIsInitializedAC, setIsLoggedInAC} from "../actions/authActions";
import {LoginValuesType} from "../types/authTypes";
import {call, put} from 'redux-saga/effects'
import {AxiosResponse} from "axios";
import {ResponseType} from "../types/taskTypes";

export function* isAuthAppWorkerSaga() {
    const res: AxiosResponse<ResponseType> = yield call(authApi.me)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(true))
    } else {
    }
    yield put(setIsInitializedAC(true))
}

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'})

// export const isAuthTC = () => (dispatch: Dispatch) => {
//     authApi.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//             } else {
//             }
//             dispatch(setIsInitializedAC(true))
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
export const logInTC = (data: LoginValuesType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC('idle'))
            }
        )
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC('idle'))
            }
        )
}