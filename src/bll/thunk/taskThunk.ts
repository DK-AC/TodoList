import {Dispatch} from "redux";
import {tasksApi} from "../../dal/api/tasks-api";
import {addTaskAC, getTasksAC} from "../actions/taskActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, title))
        })
}