import axios, {AxiosResponse} from "axios";
import {ModelTaskType, ResponseType, TaskResponseType, TaskType} from "../../bll/types/taskTypes";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseType<TaskResponseType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data.item)
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<AxiosResponse<ResponseType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: Partial<ModelTaskType>) {
        return instance.put<ModelTaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

