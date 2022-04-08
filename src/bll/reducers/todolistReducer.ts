import {
    ActionsTodolistType,
    ADD_TODOLIST,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_STATUS,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST,
    SET_TODOLISTS,
    TodolistType
} from "../types/todolistTypes";

const initialTodolistsState: TodolistType[] = []

type initialTodolistsStateType = typeof initialTodolistsState

export const todolistReducer = (state = initialTodolistsState, action: ActionsTodolistType): initialTodolistsStateType => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todolistId)
        case ADD_TODOLIST:
            return [{...action.todolist, status: 'idle', filter: 'all'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        case SET_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: 'all', appStatus: 'idle'}))
        case CHANGE_TODOLIST_STATUS:
            return state.map(todo => todo.id === action.todolistId
                ? {...todo, status: action.status} : todo)
        default:
            return state
    }
}

