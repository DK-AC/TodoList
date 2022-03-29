import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {StatusType} from "./appTypes";

export const REMOVE_TODOLIST = 'TODOLIST/REMOVE_TODOLIST'
export const ADD_TODOLIST = 'TODOLIST/ADD_TODOLIST'
export const SET_TODOLISTS = 'TODOLIST/SET_TODOLISTS'


export type ActionsTodolistType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>

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