import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import {tasksApi} from "../../dal/api/tasks-api";
import {ModelTaskType} from "../types/taskTypes";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";
import {updateTaskAC} from "../reducers/tasksReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasksTC', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    const res = await tasksApi.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
    return {todolistId, tasks: res.data.items}
})

export const addTaskTC = createAsyncThunk('tasks/addTaskTC', (payload: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    return tasksApi.createTask(payload.todolistId, payload.title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({appStatus: "succeeded"}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
            return rejectWithValue(null)
        })
})

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC', async (payload: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({appStatus: "loading"}))
    await tasksApi.deleteTask(payload.todolistId, payload.taskId)
    thunkAPI.dispatch(setAppStatusAC({appStatus: "succeeded"}))
    return payload
})

export const updateTaskTC = (todolistId: string, taskId: string, model: Partial<ModelTaskType>) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: ModelTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }
        dispatch(setAppStatusAC({appStatus: "loading"}))

        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId, taskId, model}))
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