import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {todolistReducer} from "./reducers/todolistReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appRootState = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(appRootState, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof appRootState>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store