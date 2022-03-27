import {
    ADD_TODOLIST,
    CHANGE_ENTITY_STATUS,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    FilterTodolistType,
    REMOVE_TODOLIST,
    SET_TODOLISTS,
    TodolistType
} from "../types/todolistTypes";
import {StatusType} from "./appActions";

export const removeTodolistAC = (todolistId: string) => ({type: REMOVE_TODOLIST, todolistId} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: ADD_TODOLIST, todolist} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: CHANGE_TODOLIST_TITLE, todolistId, title} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterTodolistType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: SET_TODOLISTS, todolists} as const)

export const changeEntityStatusAC = (todolistId: string, entityStatus: StatusType) => (
    {type: CHANGE_ENTITY_STATUS, todolistId, entityStatus} as const
)


