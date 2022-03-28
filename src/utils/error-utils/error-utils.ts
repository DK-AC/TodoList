import {setAppErrorAC, setAppStatusAC} from "../../bll/actions/appActions";
import {TodolistResponseType} from "../../bll/types/todolistTypes";
import {Dispatch} from "redux";
import {ActionsAppType} from "../../bll/types/appTypes";

export const handleServerAppError = (data: TodolistResponseType, dispatch: Dispatch<ActionsAppType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkAppError = (error: any, dispatch: Dispatch<ActionsAppType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}