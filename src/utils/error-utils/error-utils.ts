import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/appReducer";
import {ResponseType} from "../../bll/types/taskTypes";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleNetworkAppError = (error: any, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}