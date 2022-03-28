import {todolistsApi} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {ActionsTodolistType, TodolistType} from "../types/todolistTypes";
import {setAppError, setAppStatus} from "../actions/appActions";
import {handleServerAppError} from "../../utils/error-utils/error-utils";

export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
        .catch(e => {
            dispatch(setAppError(e.message))
            dispatch(setAppStatus('failed'))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            dispatch(setAppError(e.message))
            dispatch(setAppStatus('failed'))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistStatusAC(todolistId, "loading"))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
        .catch(e => {
            dispatch(setAppError(e.message))
            dispatch(setAppStatus('failed'))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
                dispatch(changeTodolistStatusAC(todolistId, "idle"))

            }
        )
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setAppStatus("loading"))
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
        .catch(e => {
            dispatch(setAppError(e.message))
            dispatch(setAppStatus('failed'))
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}
