import {ModelTaskType, TasksStateType} from "../types/taskTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistTypes";
import {setTodolistsAC} from "./todolistsReducer";
import {addTaskTC, fetchTasksTC, removeTaskTC} from "../thunk/taskThunk";

const initialTasksState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: Partial<ModelTaskType> }>) {
            let task = state[action.payload.todolistId]
            const index = task.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) task[index] = {...task[index], ...action.payload.model}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((todo: TodolistType) => state[todo.id] = [])
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
    },
})

export const tasksReducer = slice.reducer

export const {updateTaskAC} = slice.actions

