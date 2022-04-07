import { TasksType } from "../../ui/Task/Task";
import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, GET_TASKS, REMOVE_TASK} from "../types/taskTypes";

export const removeTaskAC = (payload: { todoId: string, taskId: string }) => {
    return {type: REMOVE_TASK, payload} as const
}
export const addTaskAC = (payload: { todoId: string, title: string }) => {
    return {type: ADD_TASK, payload} as const
}
export const changeTaskTitleAC = (payload: { todoId: string, taskId: string, title: string }) => {
    return {type: CHANGE_TASK_TITLE, payload} as const
}
export const changeTaskStatusAC = (payload: { todoId: string, taskId: string, isDone: boolean }) => {
    return {type: CHANGE_TASK_STATUS, payload} as const
}
export const getTasksAC = (todolistId: string, tasks: TasksType[]) => {
    return {type: GET_TASKS, todolistId, tasks} as const
}
