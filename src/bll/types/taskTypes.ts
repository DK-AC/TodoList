import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../actions/todolistActions";
import {ActionsAppType} from "./appTypes";

export const REMOVE_TASK = 'TASK/REMOVE_TASK'
export const ADD_TASK = 'TASK/ADD_TASK'
export const UPDATE_TASK = 'TASK/CHANGE_TASK_TITLE'
export const GET_TASKS = 'TASK/GET_TASKS'


export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof getTasksAC>
    | ActionsAppType

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}
export type TasksStateType = { [key: string]: Array<TaskType> }
export type TaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type ModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}


