import {REMOVETASK} from "../types/taskTypes";

export const removeTaskAC = (params: { todoId: string, taskId: string }) => {
    return {type: REMOVETASK, params}
}