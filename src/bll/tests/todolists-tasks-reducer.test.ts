import {tasksReducer} from "../reducers/tasksReducer";
import {addTodolistAC, todolistsReducer} from "../reducers/todolistsReducer";
import {TasksStateType} from "../types/taskTypes";
import {TodolistType} from "../types/todolistTypes";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistAC({
            todolist: {
                title: 'New Todolist',
                id: 'any id',
                addedDate: '',
                order: 0,
                filter: 'all',
                status: "idle"
            }
        })
    ;

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
