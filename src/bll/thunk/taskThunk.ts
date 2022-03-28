import {Dispatch} from "redux";
import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {AppRootStateType} from "../store";
import {tasksApi} from "../../dal/api/tasks-api";
import {ActionsTaskType, ModelTaskType} from "../types/taskTypes";
import {setAppError, setAppStatus} from "../actions/appActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
        .catch(e => {
            dispatch(setAppError(e.message))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsTaskType>) => {
    dispatch(setAppStatus("loading"))
    tasksApi.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppError(res.data.messages[0]))
                } else {
                    dispatch(setAppError('some error'))
                }
                dispatch(setAppStatus('failed'))
            }
        })
        .catch(e => {
            dispatch(setAppError(e.message))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsTaskType>) => {
    dispatch(setAppStatus("loading"))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
        .catch(e => {
            dispatch(setAppError(e.message))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const updateTaskTC = (todolistId: string, taskId: string, model: Partial<ModelTaskType>) =>
    (dispatch: Dispatch<ActionsTaskType>, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatus("loading"))
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, model))
            })
            .catch(e => {
                dispatch(setAppError(e.message))
            })
            .finally(() => {
                    dispatch(setAppStatus('idle'))
                }
            )
    }
    