import {AppRootStateType} from "../store";
import {tasksApi} from "../../dal/api/tasks-api";
import {FieldErrorType, ModelTaskType, TaskType} from "../types/taskTypes";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await tasksApi.getTasks(todolistId)
        thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
        return {todolistId, tasks: res.data.items}
    })

export const addTask = createAsyncThunk<TaskType, { todolistId: string, title: string }, { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }>('tasks/addTask',
    async (payload: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await tasksApi.createTask(payload.todolistId, payload.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return res.data.data.item
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

export const removeTask = createAsyncThunk('tasks/removeTask', async (payload: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    await tasksApi.deleteTask(payload.todolistId, payload.taskId)
    thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
    return payload
})

export const updateTask = createAsyncThunk('tasks/updateTask',
    async (payload: { todolistId: string, taskId: string, model: Partial<ModelTaskType> },
           {dispatch, getState, rejectWithValue}) => {

        let state = getState() as AppRootStateType

        const task = state.tasks[payload.todolistId].find(task => task.id === payload.taskId)
        if (!task) {
            return rejectWithValue('task not found in the state')
        }

        const apiModel: ModelTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...payload.model
        }
        dispatch(setAppStatusAC({appStatus: "loading"}))
        const res = await tasksApi.updateTask(payload.todolistId, payload.taskId, apiModel)
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

