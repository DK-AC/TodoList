import axios, {AxiosResponse} from "axios";
import {RepeatTodoType, ResponseType, TodolistType} from "./types";

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
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete <ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<RepeatTodoType>, { title: string }>(`todo-lists/${todolistId}`, {title})
    }
}

