import {addTodolistAC} from "../actions/todolistActions";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";
import {TasksStateType} from "../../ui/Task/Task";
import {TodolistType} from "../../ui/Todolist/Todolist";
import {TodolistFromServerType} from "../../dal/api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistFromServerType> = [];

    const action = addTodolistAC({todolist:{title: "new todolist"}});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoId);
    expect(idFromTodolists).toBe(action.todoId);
});
