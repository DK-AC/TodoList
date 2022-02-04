import {ADD_TASK, REMOVE_TASK} from "../types/taskTypes";

export const removeTaskAC = (payload: { todoId: string, taskId: string }) => {
    return {type: REMOVE_TASK, payload} as const
}
export const addTaskAC = (payload: { todoId: string, taskId: string, title: string }) => {
    return {type: ADD_TASK, payload} as const
}