import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    GeneralType,
    REMOVE_TODOLIST,
    SET_TODOLISTS
} from "../types/todolistTypes";
import {TodolistType} from "../../dal/api/todolists-api";


const initialState: TodolistType[] = []

type initialStateType = typeof initialState

export const todolistReducer = (state = initialState, action: GeneralType): initialStateType => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todolistId)
        case ADD_TODOLIST:
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                order: 0,
                addedDate: ''
            }, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.todolistId
                ? {...todo, title: action.title}
                : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.payload.todolistId
                ? {...todo, filter: action.payload.filter}
                : todo)
        case SET_TODOLISTS:
            return action.payload.todolists.map(todo => ({...todo, filter: 'all'}
            ))
        default:
            return state
    }
}

