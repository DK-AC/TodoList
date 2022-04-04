import * as tasksActions from './taskThunk'
import * as todolistsAsyncActions from './todolistThunk'
import * as authAsyncActions from './authThunk'
import {todolistSlices} from "../reducers/todolistsReducer";
import {authSlices} from "../reducers/authReducer";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistSlices.actions
}

const authActions = {
    ...authAsyncActions,
    ...authSlices.actions
}

export {tasksActions, todolistsActions, authActions}
