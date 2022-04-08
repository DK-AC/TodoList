import {setAppErrorAC, setAppStatusAC} from "../../bll/actions/appActions";
import {ResponseType} from "../../bll/types/taskTypes";
import {put} from "redux-saga/effects";

export function* handleServerAppError(data: ResponseType) {
    if (data.messages.length) {
        yield put(setAppErrorAC(data.messages[0]))
    } else {
        yield put(setAppErrorAC('some error'))
    }
    yield put(setAppStatusAC('failed'))
}

export function* handleNetworkAppError(error: { message: string }) {
    yield put(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    yield put(setAppStatusAC('failed'))
}