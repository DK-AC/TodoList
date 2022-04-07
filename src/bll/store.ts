import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/authReducer";
import createSagaMiddleware from "redux-saga";
import {authWatcherSagas} from "./sagas/sagas_auth";
import {taskWatcherSagas} from "./sagas/sagas_task";
import {all, takeEvery} from "redux-saga/effects";

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
    yield all([authWatcherSagas(), taskWatcherSagas()])

}

// @ts-ignore
window.store = store



