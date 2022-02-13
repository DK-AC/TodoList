import {FilterTodolistType} from "../../app/App";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "../types/todolistTypes";
import {v1} from "uuid";

export const removeTodolistAC = (payload: { todoId: string }) => {
    return {type: REMOVE_TODOLIST, payload} as const
}
export const addTodolistAC = (payload: { title: string }) => {
    return {type: ADD_TODOLIST, payload, todoId: v1()} as const
}
export const changeTodolistTitleAC = (payload: { todoId: string, title: string }) => {
    return {type: CHANGE_TODOLIST_TITLE, payload} as const
}
export const changeTodolistFilterAC = (payload: { todoId: string, filter: FilterTodolistType }) => {
    return {type: CHANGE_TODOLIST_FILTER, payload} as const
}
