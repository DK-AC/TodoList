import {Dispatch} from "redux";
import {tasksApi} from "../../dal/api/tasks-api";
import {addTaskAC, getTasksAC, removeTaskAC} from "../actions/taskActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todoListId, title)
        .then(res => {
            console.log(res.data)
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}