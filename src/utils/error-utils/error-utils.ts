import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/appReducer";
import {ResponseType} from "../../bll/types/taskTypes";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleNetworkAppError = (error: any, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}