import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST,
    SET_TODOLISTS
} from "../types/todolistTypes";
import {v1} from "uuid";
import {FilterTodolistType} from "../../ui/Todolist/Todolist";
import {TodolistFromServerType} from "../../dal/api/todolists-api";

export const removeTodolistAC = (payload: { todoId: string }) => {
    return {type: REMOVE_TODOLIST, payload} as const
}
export const addTodolistAC = (payload: { todolist: Pick<TodolistFromServerType, 'title'> }) => {
    return {type: ADD_TODOLIST, payload, todoId: v1()} as const
}
export const changeTodolistTitleAC = (payload: { todoId: string, title: string }) => {
    return {type: CHANGE_TODOLIST_TITLE, payload} as const
}
export const changeTodolistFilterAC = (payload: { todoId: string, filter: FilterTodolistType }) => {
    return {type: CHANGE_TODOLIST_FILTER, payload} as const
}
export const setTodolistsAC = (todolists: TodolistFromServerType[]) => {
    return {type: SET_TODOLISTS, todolists} as const
}
