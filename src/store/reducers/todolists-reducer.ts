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
            return [...state.filter(todo => todo.id != action.params.id)]
        case ADD_TODOLIST:
            return [...state, {id: v1(), title: action.params.title, filter: 'all'}]
        case CHANGE_TODOLIST_TITLE:
            return [...state.map(todo => todo.id === action.params.id ? {...todo, title: action.params.title} : todo)]
        case CHANGE_TODOLIST_FILTER:
            return [...state.map(todo => todo.id === action.params.id ? {...todo, filter: action.params.filter} : todo)]
        default:
            return state
    }
}

