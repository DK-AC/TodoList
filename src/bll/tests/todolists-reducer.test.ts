import {todolistReducer} from '../reducers/todolistReducer';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../actions/todolistActions";
import {TodolistType} from "../../dal/api/todolists-api";

let todolistId1: string;
let todolistId2: string

let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC({todolist: {title: 'New Todolist'}}))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New Todolist');
    expect(endState[2].filter).toBe('all')
});

test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState,
        changeTodolistTitleAC({todolistId: todolistId2, title: "New Todolist"}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {

    const endState = todolistReducer(startState,
        changeTodolistFilterAC({todolistId: todolistId2, filter: "active"}))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe('active');
});

test('todolist should be set to the state', () => {
    const endState = todolistReducer(startState, setTodolistsAC({
        todolists: [
            {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
            {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
        ]
    }))

    expect(endState.length).toBe(2)
})






