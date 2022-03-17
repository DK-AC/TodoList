import axios, { AxiosResponse } from "axios";
import {FilterTodolistType} from "../../ui/Todolist/Todolist";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
});


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<TodolistResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete <any, TodolistResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(payload: { todolistId: string, title: string }) {
        return instance.put<any, RepeatTodoType, { title: string }>(`todo-lists/${payload.todolistId}`, payload)
    }
}

type RepeatTodoType = TodolistResponseType<{ item: TodolistType }>

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
} & {
    filter: FilterTodolistType
}

export type TodolistResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}