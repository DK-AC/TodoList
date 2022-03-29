import {ModelTaskType, TasksStateType, TaskType} from "../types/taskTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistTypes";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolistsReducer";

const initialTasksState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: Partial<ModelTaskType> }>) {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ? {...task, ...action.payload.model} : task)
            }
        },
        getTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        },
    },
    extraReducers: {
        [addTodolistAC.type]: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            return {...state, [action.payload.todolist.id]: []}
        },
        [removeTodolistAC.type]: (state, action: PayloadAction<{ todolistId: string }>) => {
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        },
        [setTodolistsAC.type]: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl: TodolistType) => stateCopy[tl.id] = [])
            return stateCopy;
        },
    }
})

export const tasksReducer = slice.reducer

export const {getTasksAC, removeTaskAC, updateTaskAC, addTaskAC} = slice.actions

// export const tasksReducer = (state: TasksStateType = initialTasksState, action: any): TasksStateType => {
//     switch (action.type) {
//         case REMOVE_TASK:
//             return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
//         case ADD_TASK:
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case UPDATE_TASK:
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId]
//                     .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
//             }
//         case addTodolistAC.type:
//             return {...state, [action.payload.todolist.id]: []}
//         case removeTodolistAC.type:
//             const stateCopy = {...state};
//             delete stateCopy[action.payload.todolistId]
//             return stateCopy
//         case setTodolistsAC.type: {
//             const stateCopy = {...state}
//             action.payload.todolists.forEach((tl: TodolistType) => stateCopy[tl.id] = [])
//             return stateCopy;
//         }
//         case GET_TASKS:
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }