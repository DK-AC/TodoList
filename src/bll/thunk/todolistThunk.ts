import {todolistsApi, TodolistType} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {setTodolistsAC} from "../actions/todolistActions";

export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
        })

}