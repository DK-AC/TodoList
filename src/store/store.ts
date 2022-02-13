import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {tasksReducer} from "./reducers/tasksReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const appRootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(appRootState)

export type AppRootStateType = ReturnType<typeof appRootState>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store