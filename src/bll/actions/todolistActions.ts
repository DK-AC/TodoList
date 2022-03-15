import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST,
    SET_TODOLISTS
} from "../types/todolistTypes";
import {v1} from "uuid";
import {FilterTodolistType} from "../../ui/Todolist/Todolist";
import {TodolistType} from "../../dal/api/todolists-api";

export const removeTodolistAC = (payload: { todolistId: string }) => {
    return {type: REMOVE_TODOLIST, payload} as const
}
export const addTodolistAC = (payload: { todolist: Pick<TodolistType, 'title'> }) => {
    return {type: ADD_TODOLIST, payload, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => {
    return {type: CHANGE_TODOLIST_TITLE, payload} as const
}
export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterTodolistType }) => {
    return {type: CHANGE_TODOLIST_FILTER, payload} as const
}
export const setTodolistsAC = (payload: { todolists: TodolistType[] }) => {
    return {type: SET_TODOLISTS, payload} as const
}
