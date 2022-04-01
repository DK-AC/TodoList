import * as tasksActions from './taskThunk'
import * as todolistsActions from './todolistThunk'
import * as authActions from './authThunk'
import {slice} from "../reducers/todolistsReducer";


const todolistsAsyncActions = {
    ...todolistsActions,
    ...slice.actions
}

export {tasksActions, todolistsAsyncActions, authActions}
