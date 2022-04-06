import {createSlice} from "@reduxjs/toolkit";
import {addTask, fetchTasks, removeTask, updateTask} from "../thunk/taskThunk";
import {addTodolist, fetchTodolists} from "../thunk/todolistThunk";
import {TasksStateType, TodolistType} from "../../dal/api/types";

const initialTasksState: TasksStateType = {}

export const taskSlices = createSlice({
    name: 'tasks',
    initialState: initialTasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
            .addCase(removeTask.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
                if (index !== -1) state[action.payload.todolistId].splice(index, 1)
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((todo: TodolistType) => state[todo.id] = [])
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                let task = state[action.payload.todolistId]
                const index = task.findIndex(task => task.id === action.payload.taskId)
                if (index !== -1) task[index] = {...task[index], ...action.payload.model}
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
    },
})

