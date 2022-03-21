import {Dispatch} from "redux";
import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {AppRootStateType} from "../store";
import {tasksApi} from "../../dal/api/tasks-api";
import {ActionsTaskType, ModelTaskType} from "../types/taskTypes";
import {setStatus} from "../actions/appActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatus("loading"))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
                dispatch(setStatus('idle'))
            }
        )
}
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsTaskType>) => {
    dispatch(setStatus("loading"))
    tasksApi.createTask(todoListId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
                dispatch(setStatus('idle'))
            }
        )
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsTaskType>) => {
    dispatch(setStatus("loading"))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => {
                dispatch(setStatus('idle'))
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
        dispatch(setStatus("loading"))
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, model))
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                    dispatch(setStatus('idle'))
                }
            )
    }
    