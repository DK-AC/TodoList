import {todolistsApi} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {changeTodolistStatusAC, changeTodolistTitleAC} from "../reducers/todolistsReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

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

export const addTodolistTC = createAsyncThunk('todolist/addTodolist',
    async (title: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await todolistsApi.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({appStatus: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
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

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todolistId, title}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}
