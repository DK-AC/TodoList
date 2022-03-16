import {Dispatch} from "redux";
import {tasksApi} from "../../dal/api/tasks-api";
import {getTasksAC} from "../actions/taskActions";

export const getTasksTC = (payload: { todolistId: string }) => (dispatch: Dispatch) => {
    tasksApi.getTasks(payload.todolistId)
        .then(res => {
            dispatch(getTasksAC({tasks: res.data, todolistId: payload.todolistId}))
        })
}