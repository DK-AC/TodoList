import {
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    ActionsTodolistType,
    REMOVE_TODOLIST,
    SET_TODOLISTS, TodolistType
} from "../types/todolistTypes";

const initialState: TodolistType[] = []

type initialStateType = typeof initialState

export const todolistReducer = (state = initialState, action: ActionsTodolistType): initialStateType => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todolistId)
        case ADD_TODOLIST:
            return [action.todolist, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        case SET_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: 'all'}))
        default:
            return state
    }
}

