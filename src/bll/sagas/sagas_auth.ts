import {authApi} from "../../dal/api/authApi";
import {setAppStatusAC} from "../actions/appActions";
import {setIsInitializedAC, setIsLoggedInAC} from "../actions/authActions";
import {LoginValuesType, MeResponseType} from "../types/authTypes";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosError, AxiosResponse} from "axios";
import {ResponseType} from "../types/taskTypes";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";

//sagas
export function* isAuthAppWorkerSaga() {
    const data: MeResponseType = yield call(authApi.me)
    if (data.resultCode === 0) {
        yield put(setIsLoggedInAC(true))
    } else {
    }
    yield put(setIsInitializedAC(true))
}

export function* loginAppWorkerSaga(action: ReturnType<typeof login>) {
    yield put(setAppStatusAC("loading"))
    const res: AxiosResponse<ResponseType<{ userId?: number }>> = yield call(authApi.logIn, action.data)
    try {
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppError(res.data)
        }
    } catch (error) {
        const err = error as AxiosError
        yield* handleNetworkAppError(err)
    }
}

export function* logoutWorkerSaga() {
    yield put(setAppStatusAC("loading"))
    try {
        const res: ResponseType = yield call(authApi.logOut)
            yield put(setIsLoggedInAC(false))
            yield put(setAppStatusAC("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        yield* handleNetworkAppError(err)
    }
}

export const initializeApp = () => ({type: 'AUTH/INITIALIZE_APP'})
export const login = (data: LoginValuesType) => ({type: 'AUTH/LOGIN_APP', data})
export const logout = () => ({type: 'AUTH/LOGOUT_APP'})

export function* authWatcherSagas() {
    yield takeEvery('AUTH/INITIALIZE_APP', isAuthAppWorkerSaga)
    yield takeEvery('AUTH/LOGIN_APP', loginAppWorkerSaga)
    yield takeEvery('AUTH/LOGOUT_APP', logoutWorkerSaga)

}

//thunks
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
// export const logInTC = (data: LoginValuesType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     authApi.logIn(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
// export const logOutTC = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     authApi.logOut()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(false))
//                 dispatch(setAppStatusAC("succeeded"))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }