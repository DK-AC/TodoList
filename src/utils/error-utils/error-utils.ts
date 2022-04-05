import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../bll/reducers/appReducer";
import {ResponseType} from "../../bll/types/taskTypes";
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleAsyncServerAppError = (data: ResponseType, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}))
    }
    thunkAPI.dispatch(setAppStatusAC({appStatus: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleNetworkAppError = (error: AxiosError, dispatch: Dispatch, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleAsyncNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({appStatus: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}