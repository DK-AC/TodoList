import {appSlices} from "./appReducer"
import {authSlices} from "./authReducer"
import {taskSlices} from "./tasksReducer"
import {todolistSlices} from "./todolistsReducer"

const appReducer = appSlices.reducer
const authReducer = authSlices.reducer
const tasksReducer = taskSlices.reducer
const todolistsReducer = todolistSlices.reducer

export {appReducer, authReducer, todolistsReducer, tasksReducer}

