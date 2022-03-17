import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST,
    SET_TODOLISTS
} from "../types/todolistTypes";
import {FilterTodolistType} from "../../ui/Todolist/Todolist";
import {TodolistType} from "../../dal/api/todolists-api";

export const removeTodolistAC = (todolistId: string) => {
    return {type: REMOVE_TODOLIST, todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: ADD_TODOLIST, todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, todolistId, title} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterTodolistType) => {
    return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[] ) => {
    return {type: SET_TODOLISTS, todolists} as const
}
