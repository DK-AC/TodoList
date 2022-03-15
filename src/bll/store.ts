import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";

const appRootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(appRootState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof appRootState>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store