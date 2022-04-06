import {FieldErrorType} from "../dal/api/types";
import {rootReducer, store} from "../bll/store";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = typeof store.dispatch

export type ThunkErrorType = { rejectValue: { errors: string[], fieldsErrors?: FieldErrorType[] } }