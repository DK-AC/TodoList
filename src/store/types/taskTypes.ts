import {removeTaskAC} from "../actions/taskActions";

export const REMOVE_TASK = 'REMOVE_TASK'

export type ActionsTaskType =
    ReturnType<typeof removeTaskAC>
