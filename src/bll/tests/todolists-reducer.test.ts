import {todolistReducer} from '../reducers/todolistReducer';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {TodolistType} from "../types/todolistTypes";

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
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistReducer(startState,
        addTodolistAC({
            title: 'New Todolist',
            id: 'any id',
            addedDate: '',
            order: 0,
            filter: 'all',
            status: "idle"
        }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0].filter).toBe('all')
});

test('correct todolist should change its name', () => {
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, "New Todolist"));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, "active"))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe('active');
});

test('todolist should be set to the state', () => {
    const endState = todolistReducer(startState, setTodolistsAC([
            {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, status: "idle"},
            {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, status: "idle"}
        ]
    ))

    expect(endState.length).toBe(2)
})

test('status should be changed', () => {
    const endState = todolistReducer(startState, changeTodolistStatusAC(todolistId1, 'loading'))

    expect(startState[0].status).toBe('idle')
    expect(endState[0].status).toBe('loading')
})





