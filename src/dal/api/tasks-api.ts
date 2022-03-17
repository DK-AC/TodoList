import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskFromServerType[]>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, RepeatTaskType, { title: string }>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: { todolistId: string, taskId: string }) {
        return instance.delete<any, TaskResponseType>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
    },
    updateTask(payload: { todolistId: string, taskId: string, model: ModelTaskType }) {
        return instance.put<any, RepeatTaskType, { title: string }>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, payload.model)
    },
}

type RepeatTaskType = TaskResponseType<{ task: TaskFromServerType }>

export type TaskFromServerType = {
    addedDate?: string
    deadline?: string
    description?: string
    id: string
    order?: number
    priority?: number
    startDate?: string
    status: number
    title: string
    todoList?: null
    todoListId: string
}
export type TaskResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type ModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}