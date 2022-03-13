import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    GeneralType,
    REMOVE_TODOLIST
} from "../types/todolistTypes";
import {TodolistType} from "../../ui/Todolist/Todolist";

const initialState: TodolistType[] = []

export const todolistReducer = (state: any[] = initialState, action: GeneralType) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return [...state.filter(todo => todo.id !== action.payload.todoId)]
        case ADD_TODOLIST:
            return [...state, {id: action.todoId, title: action.payload.title, filter: 'all'}]
        case CHANGE_TODOLIST_TITLE:
            return [...state.map(todo => todo.id === action.payload.todoId
                ? {...todo, title: action.payload.title}
                : todo)]
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.payload.todoId
                ? {...todo, filter: action.payload.filter}
                : todo)
        default:
            return state
    }
}

