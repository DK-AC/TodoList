import {REMOVE_TASK} from "../types/taskTypes";

export const removeTaskAC = (params: { todoId: string, taskId: string }) => {
    return {type: REMOVE_TASK, params}
}