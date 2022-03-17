import {todolistsApi, TodolistType} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, setTodolistsAC} from "../actions/todolistActions";

export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
        })
}
export const addTodolistTC = (payload: { title: string }) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(payload)
        .then(res => {
            dispatch(addTodolistAC({todolist: {title: payload.title}}))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const updateTodolistTC = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolist(payload)
        .then(res => {
            dispatch(changeTodolistTitleAC({todolistId: payload.todolistId, title: payload.title}))
        })
}
