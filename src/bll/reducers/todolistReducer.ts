import {
    ActionsTodolistType,
    ADD_TODOLIST,
    CHANGE_ENTITY_STATUS,
    CHANGE_TODOLIST_FILTER,
    CHANGE_TODOLIST_TITLE,
    REMOVE_TODOLIST,
    SET_TODOLISTS,
    TodolistType
} from "../types/todolistTypes";

const initialState: TodolistType[] = []

type initialStateType = typeof initialState

export const todolistReducer = (state = initialState, action: ActionsTodolistType): initialStateType => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.todolistId)
        case ADD_TODOLIST:
            return [{...action.todolist, entityStatus: 'idle'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
        case SET_TODOLISTS:
            return action.todolists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
        case CHANGE_ENTITY_STATUS:
            return state.map(todo => todo.id === action.todolistId
                ? {...todo, entityStatus: action.entityStatus} : todo)
        default:
            return state
    }
}

