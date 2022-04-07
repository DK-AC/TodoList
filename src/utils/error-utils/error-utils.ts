import {setAppErrorAC, setAppStatusAC} from "../../bll/actions/appActions";
import {Dispatch} from "redux";
import {ActionsAppType} from "../../bll/types/appTypes";
import {ResponseType} from "../../bll/types/taskTypes";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch<ActionsAppType>) => {
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