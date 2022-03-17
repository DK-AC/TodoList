import axios, { AxiosResponse } from "axios";

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
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<any, ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: ModelTaskType) {
        return instance.put<any, ResponseType, { title: string }>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

export type TaskType = {
    addedDate?: string
    deadline?: string
    description?: string
    id: string
    order?: number
    priority?: number
    startDate?: string
    status: number
    title: string
    todoListId: string
}
export type TaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type ModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}