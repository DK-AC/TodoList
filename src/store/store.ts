import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const appRootState = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(appRootState)

export type AppRootStateType = ReturnType<typeof appRootState>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store