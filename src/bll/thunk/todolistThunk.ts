import {TodolistFromServerType, todolistsApi} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {setTodolistsAC} from "../actions/todolistActions";

export const setTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await todolistsApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        console.log(e)
    }
}