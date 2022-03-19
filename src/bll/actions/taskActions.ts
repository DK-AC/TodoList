import {ADD_TASK, UPDATE_TASK, GET_TASKS, REMOVE_TASK} from "../types/taskTypes";
import {ModelTaskType, TaskType} from "../../dal/api/tasks-api";

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: REMOVE_TASK, todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    debugger
    return {type: ADD_TASK, task} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: Partial<ModelTaskType>) => {
    return {type: UPDATE_TASK, todolistId, taskId, model} as const
}
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: GET_TASKS, todolistId, tasks} as const
}
