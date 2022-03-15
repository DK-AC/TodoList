import {TodolistType, todolistsApi} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {setTodolistsAC} from "../actions/todolistActions";

export const setTodolistsTC = (todolists: TodolistType[]) => async (dispatch: Dispatch) => {
    try {
        await todolistsApi.getTodolists()
        dispatch(setTodolistsAC({todolists}))
    } catch (e) {
        console.log(e)
    }
}