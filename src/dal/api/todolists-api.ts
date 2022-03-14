import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
});

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistFromServerType, AxiosResponse<TodolistFromServerType>>('')
    },
    createTodolist(data: Pick<TodolistFromServerType, 'title'>) {
        return instance.post<TodolistFromServerType, AxiosResponse<TodolistFromServerType>>('', data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistFromServerType, AxiosResponse<TodolistFromServerType>>(`${todolistId}`)
    },
    updateTodolist(todolistId: string, data: Partial<TodolistFromServerType>) {
        return instance.put<TodolistFromServerType, AxiosResponse<TodolistFromServerType>>(`${todolistId}`, data)
    }
}

export type TodolistFromServerType = {
    id: string
    title: string
    addedDate: string
    order: number
}