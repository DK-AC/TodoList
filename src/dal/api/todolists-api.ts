import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
});


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistFromServerType[]>('todo-lists')
    },
    createTodolist(payload: { title: string }) {
        return instance.post<any, RepeatTodoType, { title: string }>('todo-lists', payload)
    },
    deleteTodolist(payload: { todolistId: string }) {
        return instance.delete <any, TodolistResponseType>(`todo-lists/${payload.todolistId}`)
    },
    updateTodolist(payload: { todolistId: string, title: string }) {
        return instance.put<any, RepeatTodoType, { title: string }>(`todo-lists/${payload.todolistId}`, payload)
    }
}

type RepeatTodoType = TodolistResponseType<{ todolist: TodolistFromServerType }>

export type TodolistFromServerType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TodolistResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}