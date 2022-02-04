import {ActionsTaskType} from "../types/taskTypes";
import {TasksStateType} from "../../app/App";

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType) => {
    switch (action.type) {
        // case "REMOVE_TASK":
        //     return
        default:
            return state
    }
}