import {FilterTodolistType, TodolistType} from "../types/todolistTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatusType} from "../types/appTypes";
import {addTodolistTC} from "../thunk/todolistThunk";

export const initialTodolistsState: TodolistType[] = []


export const slice = createSlice({
    name: 'todolists',
    initialState: initialTodolistsState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift(action.payload.todolist)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterTodolistType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(todo => ({...todo, filter: 'all', status: 'idle'}))
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ todolistId: string, status: StatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolistId)
            if (index !== -1) state[index].status = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift(action.payload.todolist)
        })
    }
})

export const todolistsReducer = slice.reducer

export const {
    removeTodolistAC,
    setTodolistsAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    changeTodolistStatusAC,
    addTodolistAC
} = slice.actions

