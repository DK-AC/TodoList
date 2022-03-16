import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, GET_TASKS, REMOVE_TASK} from "../types/taskTypes";
import {TaskFromServerType} from "../../dal/api/tasks-api";

export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {type: REMOVE_TASK, payload} as const
}
export const addTaskAC = (payload: { todolistId: string, title: string }) => {
    return {type: ADD_TASK, payload} as const
}
export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: CHANGE_TASK_TITLE, payload} as const
}
export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: CHANGE_TASK_STATUS, payload} as const
}
export const getTasksAC = (payload: { todolistId: string, tasks: TaskFromServerType[] }) => {
    return {type: GET_TASKS, payload} as const
}
