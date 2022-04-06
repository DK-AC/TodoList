import {StatusType} from "./appTypes";
import {ResponseType} from "../../dal/api/types";

export type RepeatTodoType = ResponseType<{ item: TodolistType }>
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
} & {
    filter: FilterTodolistType
    status: StatusType
}
export type FilterTodolistType = 'all' | 'active' | 'completed'

export type ButtonColorType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'

