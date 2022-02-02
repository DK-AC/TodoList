import {FilterTodolistType} from "../../app/App";

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterTodolistType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
