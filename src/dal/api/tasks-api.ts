import axios from "axios";
import {ModelTaskType, ResponseItemTaskType, ResponseType, TaskResponseType} from "../../bll/types/taskTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)

    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, ResponseItemTaskType>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, model: Partial<ModelTaskType>) {
        return instance.put<ModelTaskType, ResponseItemTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then(res => res.data)
    },
}

