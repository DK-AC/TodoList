import {FilterTodolistType} from "../../app/App";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "../types/todolistTypes";

export const removeTodolistAC = (params: { id: string }) => {
    return {type: REMOVE_TODOLIST, params} as const
}
export const addTodolistAC = (params: { title: string }) => {
    return {type: ADD_TODOLIST, params} as const
}
export const changeTodolistTitleAC = (params: { id: string, title: string }) => {
    return {type: CHANGE_TODOLIST_TITLE, params} as const
}
export const changeTodolistFilterAC = (params: { id: string, filter: FilterTodolistType }) => {
    return {type: CHANGE_TODOLIST_FILTER, params} as const
}
