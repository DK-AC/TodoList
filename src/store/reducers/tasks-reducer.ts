import {ActionsTaskType} from "../types/taskTypes";
import {TasksStateType} from "../../app/App";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            debugger
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
            }
        case "ADD_TASK":
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title}
                    : task)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === task.id
                    ? {...task, title: action.payload.title}
                    : task)
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === task.id
                    ? {...task, title: action.payload.status}
                    : task)
            }
        default:
            return state
    }
}