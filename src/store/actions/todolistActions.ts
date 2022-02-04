import {FilterTodolistType} from "../../app/App";

export const removeTodolistAC = (params: { id: string }) => {
    return {type: 'REMOVE-TODOLIST', params} as const
}
export const addTodolistAC = (params: { title: string }) => {
    return {type: 'ADD-TODOLIST', params} as const
}
export const changeTodolistTitleAC = (params: { id: string, title: string }) => {
    return {type: 'CHANGE-TODOLIST-TITLE', params} as const
}
export const changeTodolistFilterAC = (params: { id: string, filter: FilterTodolistType }) => {
    return {type: 'CHANGE-TODOLIST-FILTER', params} as const
}
