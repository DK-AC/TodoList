import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer, authReducer, tasksReducer, todolistsReducer} from "./reducers";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store


//hot reload
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer)
    )
}

//08.04.2022 added sagas on todolists in branch saga_without_toolkit
// write tests for sagas


