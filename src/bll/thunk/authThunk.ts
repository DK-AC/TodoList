import {setIsLoggedInAC} from "../reducers/authReducer";
import {setAppStatusAC} from "../reducers/appReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleAsyncNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import { authApi } from "../../dal/api";
import { LoginValuesType } from "../../dal/api/types";
import {ThunkErrorType} from "../../utils/types";

export const login = createAsyncThunk<undefined, LoginValuesType, ThunkErrorType>('auth/login',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authApi.logIn(payload)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const isAuth = createAsyncThunk('auth/isAuth',
    async (payload, thunkAPI) => {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}))
        } else {
        }
    })
export const logout = createAsyncThunk('auth/logout',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await authApi.logOut()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })



