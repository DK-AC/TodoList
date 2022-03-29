import {
    addTodolistAC,
    changeTodolistStatusAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {StatusType} from "./appTypes";

export const REMOVE_TODOLIST = 'TODOLIST/REMOVE_TODOLIST'
export const ADD_TODOLIST = 'TODOLIST/ADD_TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'TODOLIST/CHANGE_TODOLIST_FILTER'
export const SET_TODOLISTS = 'TODOLIST/SET_TODOLISTS'
export const CHANGE_TODOLIST_STATUS = 'TODOLIST/CHANGE_TODOLIST_STATUS'


export type ActionsTodolistType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistStatusAC>

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