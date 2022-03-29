import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_STATUS,
    CHANGE_TODOLIST_FILTER,
    FilterTodolistType,
    REMOVE_TODOLIST,
    SET_TODOLISTS,
    TodolistType
} from "../types/todolistTypes";
import {StatusType} from "../types/appTypes";

export const removeTodolistAC = (todolistId: string) => ({type: REMOVE_TODOLIST, todolistId} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: ADD_TODOLIST, todolist} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterTodolistType) =>
    ({type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: SET_TODOLISTS, todolists} as const)

export const changeTodolistStatusAC = (todolistId: string, status: StatusType) => (
    {type: CHANGE_TODOLIST_STATUS, todolistId, status} as const
)

