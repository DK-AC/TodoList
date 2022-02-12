import {TasksStateType, TodolistType} from "../../app/App";
import {addTodolistAC} from "../actions/todolistActions";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistsReducer} from "../reducers/todolistsReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC({title: "new todolist"});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoId);
    expect(idFromTodolists).toBe(action.todoId);
});
