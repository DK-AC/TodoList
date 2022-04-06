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


