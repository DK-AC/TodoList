import {ActionsTaskType, ADD_TASK, GET_TASKS, REMOVE_TASK, UPDATE_TASK} from "../types/taskTypes";
import {ADD_TODOLIST, REMOVE_TODOLIST, SET_TODOLISTS} from "../types/todolistTypes";
import {TasksStateType} from "../../ui/Task/Task";
import {TodolistType} from "../../dal/api/todolists-api";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [{
                    status: action.task.status,
                    todoListId: action.task.todoListId,
                    title: action.task.title,
                    id: action.task.id,
                    addedDate: action.task.addedDate,
                    deadline: action.task.deadline,
                    description: action.task.description,
                    priority: action.task.priority,
                    startDate: action.task.startDate,
                    order: action.task.order
                }, ...state[action.task.todoListId]]
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId
                        ? {...task, ...action.model}
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
            action.todolists.forEach((tl: TodolistType) => {
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