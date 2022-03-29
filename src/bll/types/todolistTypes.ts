import {StatusType} from "./appTypes";

export type RepeatTodoType = TodolistResponseType<{ item: TodolistType }>
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
} & {
    filter: FilterTodolistType
    status: StatusType
}
export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}