import {todolistsApi} from "../../dal/api/";
import {handleAsyncNetworkError, handleAsyncServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {changeTodolistStatusAC} from "../reducers/todolistsReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodolistType} from "../../dal/api/types";
import {ThunkErrorType} from "../../utils/types";

export const fetchTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkErrorType>('todolists/fetchTodolists',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await todolistsApi.getTodolists()
            thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
            return {todolists: res.data}
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkErrorType>('todolists/addTodolist',
    async (title, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await todolistsApi.createTodolist(title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return {todolist: res.data.data.item}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })
export const removeTodolist = createAsyncThunk<{ todolistId: string }, string, ThunkErrorType>('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    thunkAPI.dispatch(changeTodolistStatusAC({todolistId, status: "loading"}))
    await todolistsApi.deleteTodolist(todolistId)
    thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
    return {todolistId}
})
export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle',
    async (payload: { todolistId: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await todolistsApi.updateTodolist(payload.todolistId, payload.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return {todolistId: payload.todolistId, title: payload.title}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })

