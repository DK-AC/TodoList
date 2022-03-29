import {TodolistResponseType} from "../../bll/types/todolistTypes";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/appReducer";

export const handleServerAppError = (data: TodolistResponseType, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleNetworkAppError = (error: any, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}