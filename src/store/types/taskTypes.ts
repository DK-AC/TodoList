import {addTaskAC, removeTaskAC} from "../actions/taskActions";

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'

export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
