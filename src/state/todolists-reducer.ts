import {FilterTasksType, TodolistType} from "../app/App";
import {v1} from "uuid";

/*type StateType = {
    age: number
    childrenCount: number
    name: string
}*/

type GeneralType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType

export const todolistsReducer = (state: Array<TodolistType>, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id != action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(m => m.id === action.id ? {...m, title: action.title} : m)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
        default:
            throw new Error("I don't understand this type")
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterTasksType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}