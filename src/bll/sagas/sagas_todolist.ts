import {todolistsApi} from "../../dal/api/todolists-api";
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {TodolistType} from "../types/todolistTypes";
import {setAppStatusAC} from "../actions/appActions";
import {call, put, takeEvery} from "redux-saga/effects";
import {ResponseType} from "../types/taskTypes";
import {AxiosResponse} from "axios";

//sagas
export function* fetchTodolistsWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    const res: ResponseType<TodolistType[]> = yield call(todolistsApi.getTodolists)
    try {
        yield put(setTodolistsAC(res.data))
        yield put(setAppStatusAC('succeeded'))
    } catch (error) {
        console.log(error)
    }
}

export function* addTodolistWorkerSaga(action: ReturnType<typeof addTodolist>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType<{ item: TodolistType }>> = yield call(todolistsApi.createTodolist, action.todolist.title)
    try {
        yield put(addTodolistAC(res.data.data.item))
        yield put(setAppStatusAC('succeeded'))
    } catch (error) {
        console.log(error)
    }
}

export function* removeTodolistWorkerSaga(action: ReturnType<typeof removeTodolist>) {
    yield put(setAppStatusAC("loading"))
    yield put(changeTodolistStatusAC(action.todolistId, "loading"))
    const res: AxiosResponse<ResponseType> = yield call(todolistsApi.deleteTodolist, action.todolistId)
    try {
        yield put(removeTodolistAC(action.todolistId))
        yield put(setAppStatusAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export function* updateTodolistWorkerSaga(action: ReturnType<typeof updateTodolist>) {

    yield put(setAppStatusAC("loading"))
    yield put(changeTodolistStatusAC(action.todolistId, "loading"))
    const res: AxiosResponse<ResponseType> = yield call(todolistsApi.updateTodolist, action.todolistId, action.title)
    try {
        yield put(changeTodolistTitleAC(action.todolistId, action.title))
        yield put(setAppStatusAC("succeeded"))
        yield put(changeTodolistStatusAC(action.todolistId, "succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export const fetchTodolists = () => ({type: 'TODOLISTS/FETCH_TODOLISTS'})
export const addTodolist = (todolist: TodolistType) => ({type: 'TODOLISTS/ADD_TODOLIST', todolist})
export const removeTodolist = (todolistId: string) => ({type: 'TODOLISTS/REMOVE_TODOLIST', todolistId})
export const updateTodolist = (todolistId: string, title: string) => (
    {type: 'TODOLISTS/UPDATE_TODOLIST', todolistId, title})

export function* todolistWatcherSagas() {
    yield takeEvery('TODOLISTS/FETCH_TODOLISTS', fetchTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/ADD_TODOLIST', addTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/REMOVE_TODOLIST', removeTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/UPDATE_TODOLIST', updateTodolistWorkerSaga)
}


//thunks
// export const setTodolistsTC = (todolists: TodolistType[]) => (dispatch: Dispatch<ActionsTodolistType>) => {
//     dispatch(setAppStatusAC("loading"))
//     todolistsApi.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
// export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
//     dispatch(setAppStatusAC("loading"))
//     todolistsApi.createTodolist(title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTodolistAC(res.data.data.item))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
// export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
//     dispatch(setAppStatusAC("loading"))
//     dispatch(changeTodolistStatusAC(todolistId, "loading"))
//     todolistsApi.deleteTodolist(todolistId)
//         .then(res => {
//             dispatch(removeTodolistAC(todolistId))
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//                 dispatch(changeTodolistStatusAC(todolistId, "idle"))
//
//             }
//         )
// }
// export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsTodolistType>) => {
//     dispatch(setAppStatusAC("loading"))
//     todolistsApi.updateTodolist(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(changeTodolistTitleAC(todolistId, title))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
