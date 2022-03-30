import {ModelTaskType, TasksStateType, TaskType} from "../types/taskTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../types/todolistTypes";
import {addTodolistAC, setTodolistsAC} from "./todolistsReducer";
import {fetchTasksTC, removeTaskTC} from "../thunk/taskThunk";

const initialTasksState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {

        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: Partial<ModelTaskType> }>) {
            let task = state[action.payload.todolistId]
            const index = task.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) task[index] = {...task[index], ...action.payload.model}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
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

export const {updateTaskAC, addTaskAC} = slice.actions

