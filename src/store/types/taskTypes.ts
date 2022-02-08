import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../actions/taskActions";

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'

export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
