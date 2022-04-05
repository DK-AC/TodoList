import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {todolistsReducer} from "./reducers/todolistsReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReducer";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/appReducer";
import {authReducer} from "./reducers/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {FieldErrorType} from "./types/taskTypes";

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

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()


// @ts-ignore
window.store = store

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch();

    const action = useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, []);

    return action;
}

export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }
