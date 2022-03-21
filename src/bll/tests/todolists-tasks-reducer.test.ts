import {addTodolistAC} from "../actions/todolistActions";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";
import {TasksStateType} from "../types/taskTypes";
import {TodolistType} from "../types/todolistTypes";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistAC({title: 'New Todolist', id: 'any id', addedDate: '', order: 0, filter: 'all'});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
