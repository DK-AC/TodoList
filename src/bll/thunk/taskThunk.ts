import {AppRootStateType, ThunkErrorType} from "../store";
import {tasksApi} from "../../dal/api/";
import {ModelTaskType, TaskType} from "../types/taskTypes";
import {handleAsyncNetworkError, handleAsyncServerAppError,} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkErrorType>('tasks/fetchTasks',
    async (todolistId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await tasksApi.getTasks(todolistId)
            thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
            return {todolistId, tasks: res.data.items}
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })
export const addTask = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkErrorType>('tasks/addTask',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await tasksApi.createTask(payload.todolistId, payload.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return res.data.data.item
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })
export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkErrorType>('tasks/removeTask',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        await tasksApi.deleteTask(payload.todolistId, payload.taskId)
        thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
        return payload
    })
export const updateTask = createAsyncThunk('tasks/updateTask',
    async (payload: { todolistId: string, taskId: string, model: Partial<ModelTaskType> },
           thunkAPI) => {

        let state = thunkAPI.getState() as AppRootStateType

        const task = state.tasks[payload.todolistId].find(task => task.id === payload.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
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
        thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
        try {
            const res = await tasksApi.updateTask(payload.todolistId, payload.taskId, apiModel)

            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return payload
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI)
        }
    })

