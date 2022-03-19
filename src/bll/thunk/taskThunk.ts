import {Dispatch} from "redux";
import {ModelTaskType, tasksApi} from "../../dal/api/tasks-api";
import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {AppRootStateType} from "../store";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todoListId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
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

        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, model))
            })
    }
    