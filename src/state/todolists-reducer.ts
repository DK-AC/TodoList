import {TodolistType} from "../App";

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

/*type GeneralType = RemoveTodolistActionType*/

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        default:
            throw new Error("I don't understand this type")
    }
}

/*
type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
*/



