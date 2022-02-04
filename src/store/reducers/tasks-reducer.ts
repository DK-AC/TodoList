import {ActionsTaskType} from "../types/taskTypes";
import {TasksStateType} from "../../app/App";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        case "REMOVE_TASK":
            debugger
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id === action.payload.taskId)
            }
        default:
            return state
    }
}