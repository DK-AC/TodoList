import {TodolistType} from "../app/App";
import {v1} from "uuid";
import {GeneralType} from "../store/types/todolistTypes";


export const todolistsReducer = (state: Array<TodolistType>, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(tl => tl.id != action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(m => m.id === action.id ? {...m, title: action.title} : m)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)]
        default:
            throw new Error("I don't understand this type")
    }
}

