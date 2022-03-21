import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";

export const REMOVE_TODOLIST = 'TODOLIST/REMOVE_TODOLIST'
export const ADD_TODOLIST = 'TODOLIST/ADD_TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'TODOLIST/CHANGE_TODOLIST_TITLE'
export const CHANGE_TODOLIST_FILTER = 'TODOLIST/CHANGE_TODOLIST_FILTER'
export const SET_TODOLISTS = 'TODOLIST/SET_TODOLISTS'


export type GeneralType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
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
}
export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}