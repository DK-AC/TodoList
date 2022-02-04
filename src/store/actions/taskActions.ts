import {REMOVE_TASK} from "../types/taskTypes";

export const removeTaskAC = (payload: { todoId: string, taskId: string }) => {
    return {type: REMOVE_TASK, payload}
}