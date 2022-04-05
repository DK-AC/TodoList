import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/appReducer";
import {ResponseType} from "../../bll/types/taskTypes";
import {AxiosError} from "axios";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleNetworkAppError = (error: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleAsyncNetworkError = (error: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({appStatus: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}