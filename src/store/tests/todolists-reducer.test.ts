import {todolistReducer} from '../reducers/todolistReducer';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../actions/todolistActions";
import {TodolistType} from "../../components/Todolist/Todolist";

let todolistId1: string;
let todolistId2: string

let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC({todoId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC({title: 'New Todolist'}))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New Todolist');
    expect(endState[2].filter).toBe('all')
});

test('correct todolist should change its name', () => {

    const endState = todolistReducer(startState,
        changeTodolistTitleAC({todoId: todolistId2, title: "New Todolist"}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {

    const endState = todolistReducer(startState,
        changeTodolistFilterAC({todoId: todolistId2, filter: "active"}))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe('active');
});






