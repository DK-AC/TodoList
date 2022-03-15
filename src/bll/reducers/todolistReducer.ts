import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    GeneralType,
    REMOVE_TODOLIST,
    SET_TODOLISTS
} from "../types/todolistTypes";
import {TodolistFromServerType} from "../../dal/api/todolists-api";


const initialState: TodolistFromServerType[] = []

type initialStateType = typeof initialState

export const todolistReducer = (state = initialState, action: GeneralType): initialStateType => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.payload.todoId)
        case ADD_TODOLIST:
            return [...state, {
                id: action.todoId,
                title: action.payload.todolist.title,
                filter: 'all',
                order: 0,
                addedDate: ''
            }]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.payload.todoId
                ? {...todo, title: action.payload.title}
                : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.payload.todoId
                ? {...todo, filter: action.payload.filter}
                : todo)
        case SET_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: 'all'}
            ))
        default:
            return state
    }
}

