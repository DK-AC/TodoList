import {AxiosResponse} from 'axios'
import {RepeatTodoType, ResponseType, TodolistType} from './types'
import {instance} from './instance'


export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{
      item: TodolistType
    }>>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete <ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<RepeatTodoType>, {
      title: string
    }>(`todo-lists/${todolistId}`, {title})
  }
}

