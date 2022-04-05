import {todolistsApi} from "../../dal/api/todolists-api";
import {
    handleAsyncNetworkError,
    handleAsyncServerAppError,
    handleNetworkAppError
} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {changeTodolistStatusAC} from "../reducers/todolistsReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistTypes";
import {ThunkErrorType} from "../store";

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists',
    async (payload, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.getTodolists()
        try {
            dispatch(setAppStatusAC({appStatus: "succeeded"}))
            return {todolists: res.data}
        } catch (err: any) {
            handleNetworkAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkErrorType>('todolists/addTodolist',
    async (title, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.createTodolist(title)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return {todolist: res.data.data.item}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err: any) {
            handleAsyncNetworkError(err, thunkAPI)

        }
    })

export const removeTodolist = createAsyncThunk('todolists/removeTodolist',
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        dispatch(changeTodolistStatusAC({todolistId, status: "loading"}))
        const res = await todolistsApi.deleteTodolist(todolistId)
        try {
            dispatch(setAppStatusAC({appStatus: "succeeded"}))
            dispatch(changeTodolistStatusAC({todolistId, status: "succeeded"}))
            return {todolistId}
        } catch (error: any) {
            handleNetworkAppError(error, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolist',
    async (payload: { todolistId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await todolistsApi.updateTodolist(payload.todolistId, payload.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return payload
            } else {
                handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })

