import {Dispatch} from "redux";
import {tasksApi} from "../../dal/api/tasks-api";
import {getTasksAC} from "../actions/taskActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(getTasksAC(todolistId, res.data))
        })
}