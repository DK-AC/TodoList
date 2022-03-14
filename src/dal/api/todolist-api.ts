import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
});

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistFromServerType, AxiosResponse>('')
    },
    createTodolist(data: TodolistFromServerType) {
        return instance.post('', data)
    }
}

export type TodolistFromServerType = {
    id?: string
    title: string
    addedDate?: string
    order?: number
}