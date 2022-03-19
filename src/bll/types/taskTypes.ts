import {addTaskAC, updateTaskAC, getTasksAC, removeTaskAC} from "../actions/taskActions";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../actions/todolistActions";

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'CHANGE_TASK_TITLE'
export const GET_TASKS = 'GET_TASKS'


export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof getTasksAC>

