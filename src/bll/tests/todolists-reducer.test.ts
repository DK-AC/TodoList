import {changeTodolistFilterAC, changeTodolistStatusAC, todolistsReducer} from '../reducers/todolistsReducer';
import {v1} from 'uuid';
import {TodolistType} from "../types/todolistTypes";
import {addTodolist, fetchTodolists, removeTodolist, updateTodolistTitle} from "../thunk/todolistThunk";

let todolistId1: string;
let todolistId2: string

let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, status: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, status: "idle"}
    ]
})

test('correct todolist should be removed', () => {
    const action = removeTodolist.fulfilled({todolistId: todolistId1}, 'requestId', todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let payload: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0,
        filter: 'all',
        status: "idle"
    };

    const action = addTodolist.fulfilled({todolist: payload}, 'requestId', payload.title)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].filter).toBe('all')
});

test('correct todolist should change its name', () => {

    let payload = {todolistId: todolistId2, title: "New Todolist"};

    const action = updateTodolistTitle.fulfilled(payload, 'requestId', payload)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter: "active"}))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe('active');
});

test('todolist should be set to the state', () => {

    let payload: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, status: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, status: "idle"}
    ]

    const action = fetchTodolists.fulfilled({todolists: payload}, 'requestId')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
})

test('status should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistStatusAC({todolistId: todolistId1, status: 'loading'}))

    expect(startState[0].status).toBe('idle')
    expect(endState[0].status).toBe('loading')
})




