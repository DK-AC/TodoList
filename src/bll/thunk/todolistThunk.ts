import {todolistsApi, TodolistType} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {addTodolistAC, setTodolistsAC} from "../actions/todolistActions";

export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
        })
}
export const addTodolistTC = (payload: { title: string }) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(payload)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.todolist}))
        })
}
