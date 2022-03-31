import {authApi} from "../../dal/api/authApi";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {LoginValuesType} from "../types/authTypes";
import {setIsInitializedAC, setIsLoggedInAC} from "../reducers/authReducer";
import {setAppStatusAC} from "../reducers/appReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {FieldErrorType} from "../types/taskTypes";

export const logInTC = createAsyncThunk<undefined, LoginValuesType, { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('auth/logInTC',
    async (payload, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authApi.logIn(payload)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err: any) {
            const error: AxiosError = err
            handleNetworkAppError(error, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })
export const isAuthTC = createAsyncThunk('auth/isAuthTC',
    async (boolean, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authApi.me()
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                dispatch(setIsLoggedInAC({isLoggedIn: true}))
                return dispatch(setIsInitializedAC({isInitialized: true}))
            }
        } catch (err: any) {
            const error: AxiosError = err
            handleNetworkAppError(error, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logOutTC = createAsyncThunk('auth/logOutTC',
    async (payload, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authApi.logOut()
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            handleNetworkAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })



