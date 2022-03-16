import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, getTasksAC, removeTaskAC} from "../actions/taskActions";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../actions/todolistActions";

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const GET_TASKS = 'GET_TASKS'


export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof getTasksAC>

