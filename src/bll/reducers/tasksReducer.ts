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
            let task = state[action.payload.todolistId]
            const index = task.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) task[index] = {...task[index], ...action.payload.model}
        },
        getTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((todo: TodolistType) => state[todo.id] = [])
        })
    },
})

export const tasksReducer = slice.reducer

export const {getTasksAC, removeTaskAC, updateTaskAC, addTaskAC} = slice.actions

