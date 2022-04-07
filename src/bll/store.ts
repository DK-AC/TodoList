import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import {takeEvery} from "redux-saga/effects";
import {isAuthAppWorkerSaga} from "./thunk/authThunk";
import {addTaskWorkerSaga, fetchTasksWorkerSaga, removeTaskWorkerSaga} from "./thunk/taskThunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const appRootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(appRootState, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

export type AppRootStateType = ReturnType<typeof appRootState>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('APP/INITIALIZE-APP', isAuthAppWorkerSaga)
    yield takeEvery('TASKS/FETCH_TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/ADD_TASK', addTaskWorkerSaga)
    yield takeEvery('TASKS/REMOVE_TASK', removeTaskWorkerSaga)
}


// @ts-ignore
window.store = store



