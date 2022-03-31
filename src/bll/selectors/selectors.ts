import {AppRootStateType} from "../store";

//app
export const selectStatus = (state: AppRootStateType) => state.app.appStatus
export const selectError = (state: AppRootStateType) => state.app.error

//auth
export const selectIsInitialized = (state: AppRootStateType) => state.auth.isInitialized
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

//todolist
export const selectTodolists = (state: AppRootStateType) => state.todolists




