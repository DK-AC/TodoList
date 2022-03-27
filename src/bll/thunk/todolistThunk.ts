import {todolistsApi} from "../../dal/api/todolists-api";
import {Dispatch} from "redux";
import {
    addTodolistAC,
    changeEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {ActionsTodolistType, TodolistType} from "../types/todolistTypes";
import {setError, setStatus} from "../actions/appActions";

export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setStatus("loading"))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
        .catch(e => {
            dispatch(setError(e.message))
        })
        .finally(() => {
                dispatch(setStatus('idle'))
            }
        )
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setStatus("loading"))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatus('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setError(res.data.messages[0]))
                } else {
                    dispatch(setError('some error'))
                }
                dispatch(setStatus('failed'))
            }
        })
        .catch(e => {
            dispatch(setError(e.message))
        })
        .finally(() => {
                dispatch(setStatus('idle'))
            }
        )
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setStatus("loading"))
    dispatch(changeEntityStatusAC(todolistId, "loading"))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
        .catch(e => {
            dispatch(setError(e.message))
        })
        .finally(() => {
                dispatch(setStatus('idle'))
                dispatch(changeEntityStatusAC(todolistId, "idle"))

            }
        )
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
    dispatch(setStatus("loading"))
    todolistsApi.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
        .catch(e => {
            dispatch(setError(e.message))
        })
        .finally(() => {
                dispatch(setStatus('idle'))
            }
        )
}
