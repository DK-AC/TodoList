import {todolistsApi} from "../../dal/api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {changeTodolistStatusAC} from "../reducers/todolistsReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistTypes";
import {FieldErrorType} from "../types/taskTypes";
import {AxiosError} from "axios";

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists',
    async (payload, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.getTodolists()
        try {
            dispatch(setAppStatusAC({appStatus: "succeeded"}))
            return {todolists: res.data}
        } catch (err) {
            handleNetworkAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('todolists/addTodolist',
    async (title, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.createTodolist(title)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch, false)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err: any) {
            const error: AxiosError = err
            handleNetworkAppError(error, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
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
        } catch (err) {
            handleNetworkAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolist',
    async (payload: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.updateTodolist(payload.todolistId, payload.title)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return payload
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            handleNetworkAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })

