import {
    ActionsTaskType,
    ADD_TASK,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_TITLE,
    GET_TASKS,
    REMOVE_TASK
} from "../types/taskTypes";
import {ADD_TODOLIST, REMOVE_TODOLIST, SET_TODOLISTS} from "../types/todolistTypes";
import {TasksStateType} from "../../ui/Task/Task";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case ADD_TASK:
            return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]}
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === task.id
                        ? {...task, title: action.title}
                        : task)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, status: action.status}
                        : task)
            }
        case ADD_TODOLIST:
            return {
                ...state, [action.todolist.id]: []
            }
        case REMOVE_TODOLIST:
            const stateCopy = {...state};
            delete stateCopy[action.todolistId]
            return stateCopy
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case GET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}