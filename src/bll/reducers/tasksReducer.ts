import {ActionsTaskType, ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK} from "../types/taskTypes";
import {ADD_TODOLIST, REMOVE_TODOLIST, SET_TODOLISTS} from "../types/todolistTypes";
import {v1} from "uuid";
import {TasksStateType} from "../../ui/Task/Task";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(task => task.id !== action.payload.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId]]
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === task.id
                        ? {...task, title: action.payload.title}
                        : task)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task)
            }
        case ADD_TODOLIST:
            return {
                ...state, [action.todolistId]: []
            }
        case REMOVE_TODOLIST:
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "GET_TASKS":
            return {...state, [action.payload.todolistId]: [action.payload.tasks]}
        default:
            return state
    }
}