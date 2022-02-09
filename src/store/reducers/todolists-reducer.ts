import {TodolistType} from "../../app/App";
import {v1} from "uuid";
import {GeneralType} from "../types/todolistTypes";

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(todo => todo.id != action.params.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.params.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(todo => todo.id === action.params.id ? {...todo, title: action.params.title} : todo)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(todo => todo.id === action.params.id ? {...todo, filter: action.params.filter} : todo)]
        default:
            return state
    }
}

