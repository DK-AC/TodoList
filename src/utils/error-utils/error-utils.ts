import {setAppError, setAppStatus} from "../../bll/actions/appActions";
import {TodolistResponseType} from "../../bll/types/todolistTypes";
import {Dispatch} from "redux";
import {ActionsAppType} from "../../bll/types/appTypes";

export const handleServerAppError = (data: TodolistResponseType, dispatch: Dispatch<ActionsAppType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('some error'))
    }
    dispatch(setAppStatus('failed'))
}