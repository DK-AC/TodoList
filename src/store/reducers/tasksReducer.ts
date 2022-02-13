import {ActionsTaskType, ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK} from "../types/taskTypes";
import {ADD_TODOLIST, REMOVE_TODOLIST} from "../types/todolistTypes";
import {v1} from "uuid";
import {TasksStateType} from "../../components/Task/Task";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
            }
        case ADD_TASK:
            return {
                [action.payload.todoId]:
                    [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todoId]]
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === task.id
                    ? {...task, title: action.payload.title}
                    : task)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone}
                    : task)
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todoId]: []
            }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state};
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }
        default:
            return state
    }
}