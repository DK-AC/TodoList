import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, fetchTodolists, removeTodolist, updateTodolistTitle} from "../thunk/todolistThunk";
import {FilterTodolistType, StatusType, TodolistType} from "../../dal/api/types";

export const initialTodolistsState: TodolistType[] = []

export const todolistSlices = createSlice({
    name: 'todolists',
    initialState: initialTodolistsState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterTodolistType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: StatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].status = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', status: 'idle'})
        })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(todo => ({...todo, filter: 'all', status: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state[index].title = action.payload.title
            })
    }
})

export const {changeTodolistFilterAC, changeTodolistStatusAC,} = todolistSlices.actions

