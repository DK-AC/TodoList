import {ADD_TASK, GET_TASKS, REMOVE_TASK, TasksStateType, UPDATE_TASK} from "../types/taskTypes";
import {TodolistType} from "../types/todolistTypes";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolistsReducer";

const initialTasksState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialTasksState, action: any): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case UPDATE_TASK:
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case addTodolistAC.type:
            return {...state, [action.payload.todolist.id]: []}
        case removeTodolistAC.type:
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case setTodolistsAC.type: {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl: TodolistType) => stateCopy[tl.id] = [])
            return stateCopy;
        }
        case GET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}