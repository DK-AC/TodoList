import {Dispatch} from "redux";
import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {AppRootStateType} from "../store";
import {tasksApi} from "../../dal/api/tasks-api";
import {ActionsTaskType, ModelTaskType} from "../types/taskTypes";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";
import {setAppStatusAC} from "../reducers/appReducer";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    tasksApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({appStatus: "idle"}))
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
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({appStatus: "loading"}))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatusAC({appStatus: "idle"}))
            }
        )
}
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
                    dispatch(updateTaskAC(todolistId, taskId, model))
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
    