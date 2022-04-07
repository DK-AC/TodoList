import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../actions/taskActions";
import {tasksApi} from "../../dal/api/tasks-api";
import {ModelTaskType, ResponseType, TaskType} from "../types/taskTypes";
import {setAppStatusAC} from "../actions/appActions";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";

//sagas
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC("loading"))
    const res: AxiosResponse<{ items: TaskType[] }> = yield call(tasksApi.getTasks, action.todolistId)
    try {
        yield put(getTasksAC(action.todolistId, res.data.items))
        yield put(setAppStatusAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export function* addTaskWorkerSaga(action: any) {
    yield put(setAppStatusAC("loading"))
    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(tasksApi.createTask, action.todolistId, action.title)
    try {
        yield put(addTaskAC(res.data.data.item))
        yield put(setAppStatusAC('succeeded'))
    } catch (error) {
        console.log(error)
    }
}

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    yield put(setAppStatusAC("loading"))
    const res: AxiosResponse<ResponseType> = yield call(tasksApi.removeTask, action.todolistId, action.taskId)
    try {
        yield put(removeTaskAC(action.todolistId, action.taskId))
        yield put(setAppStatusAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {

    yield put(setAppStatusAC("loading"))
    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(tasksApi.updateTask, action.todolistId, action.taskId,
        {title: action.model.title, status: action.model.status})
    try {
        yield put(updateTaskAC(action.todolistId, action.taskId,
            {title: action.model.title, status: action.model.status}))
        yield put(setAppStatusAC("succeeded"))
    } catch (error) {
        console.log(error)
    }
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH_TASKS', todolistId})
export const addTask = (todolistId: string, title: string) => ({type: 'TASKS/ADD_TASK', todolistId, title})
export const removeTask = (todolistId: string, taskId: string) => (
    {type: 'TASKS/REMOVE_TASK', todolistId, taskId})
export const updateTask = (todolistId: string, taskId: string, model: ModelTaskType) => (
    {type: 'TASKS/UPDATE_TASK', todolistId, taskId, model})

export function* taskWatcherSagas() {
    yield takeEvery('TASKS/FETCH_TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/ADD_TASK', addTaskWorkerSaga)
    yield takeEvery('TASKS/REMOVE_TASK', removeTaskWorkerSaga)
    yield takeEvery('TASKS/UPDATE_TASK', updateTaskWorkerSaga)
}


//thunks
// export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     tasksApi.getTasks(todolistId)
//         .then(res => {
//             dispatch(getTasksAC(todolistId, res.data.items))
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
// export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsTaskType>) => {
//     dispatch(setAppStatusAC("loading"))
//     tasksApi.createTask(todoListId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTaskAC(res.data.data.item))
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
// export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsTaskType>) => {
//     dispatch(setAppStatusAC("loading"))
//     tasksApi.deleteTask(todolistId, taskId)
//         .then(res => {
//             dispatch(removeTaskAC(todolistId, taskId))
//         })
//         .catch(error => {
//             handleNetworkAppError(error, dispatch)
//         })
//         .finally(() => {
//                 dispatch(setAppStatusAC('idle'))
//             }
//         )
// }
// export const updateTaskTC = (todolistId: string, taskId: string, model: Partial<ModelTaskType>) =>
//     (dispatch: Dispatch<ActionsTaskType>, getState: () => AppRootStateType) => {
//         const task = getState().tasks[todolistId].find(task => task.id === taskId)
//         if (!task) {
//             console.warn('task not found in the state')
//             return
//         }
//
//         const apiModel: ModelTaskType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             title: task.title,
//             status: task.status,
//             ...model
//         }
//         dispatch(setAppStatusAC("loading"))
//
//         tasksApi.updateTask(todolistId, taskId, apiModel)
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(updateTaskAC(todolistId, taskId, model))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch(error => {
//                 handleNetworkAppError(error, dispatch)
//             })
//             .finally(() => {
//                     dispatch(setAppStatusAC('idle'))
//                 }
//             )
//     }
    