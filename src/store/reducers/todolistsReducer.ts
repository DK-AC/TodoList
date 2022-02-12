import {TodolistType} from "../../app/App";
import {v1} from "uuid";
import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    GeneralType,
    REMOVE_TODOLIST
} from "../types/todolistTypes";

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: GeneralType) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return [...state.filter(todo => todo.id != action.payload.id)]
        case ADD_TODOLIST:
            return [...state, {id: v1(), title: action.payload.title, filter: 'all'}]
        case CHANGE_TODOLIST_TITLE:
            return [...state.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)]
        case CHANGE_TODOLIST_FILTER:
            return [...state.map(todo => todo.id === action.payload.id ? {...todo, filter: action.payload.filter} : todo)]
        default:
            return state
    }
}

