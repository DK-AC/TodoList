import {tasksReducer} from "../../reducers/tasksReducer";
import {addTaskAC, removeTaskAC, updateTaskAC} from "../../actions/taskActions";
import {addTodolistAC, setTodolistsAC} from "../../actions/todolistActions";
import {initialGlobalState} from "../../../stories/reduxStoreProviderDecorator";
import {TasksStateType} from "../../types/taskTypes";
import {TodolistType} from "../../types/todolistTypes";

let startState: TasksStateType = {}

beforeEach(() => startState = initialGlobalState.tasks)

test('correct task should be removed', () => {
    let endState = tasksReducer(startState, removeTaskAC('todoListId1', '2'))

    expect(startState['todoListId1'].length).toBe(3)
    expect(startState['todoListId1'][1].id).toBe('2')
    expect(endState['todoListId1'][1].id).toBe('3')
    expect(endState['todoListId1'].length).toBe(2)
    expect(startState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(3)

})

test('add task with the correct title', () => {
    let endState = tasksReducer(startState, addTaskAC({
        id: '2',
        title: '2',
        status: 0,
        todoListId: 'todoListId2',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 1,
        startDate: ''
    }))

    expect(startState['todoListId2']).toEqual(initialGlobalState.tasks.todoListId2)
    expect(startState['todoListId2'][0].title).toBe('Rest Api')
    expect(endState['todoListId2'][0].title).toBe('2')
    expect(endState["todoListId2"][0].id).toBeDefined();

})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC("todoListId2", "2", {status: 1}))

    expect(startState['todoListId2'][1].status).toBe(0);
    expect(endState['todoListId2'][1].status).toBe(1);
});

test('title of specified task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC("todoListId1", "1", {title: 'New Title'}))

    expect(startState['todoListId1'][0].title).toBe('HTML');
    expect(endState['todoListId1'][0].title).toBe('New Title');
});

test('new array should be added when new todolist is added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0,
        filter: 'all',
        status: "idle"
    }

    const endState = tasksReducer(startState, addTodolistAC(todolist))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('empty arrays should be added when we set todolists', () => {
    const endState = tasksReducer(startState, setTodolistsAC(
        [
            {id: '1', title: "title 1", filter: "all", addedDate: '', order: 0, status: "idle"},
            {id: '2', title: "title 2", filter: "all", addedDate: '', order: 0, status: "idle"}
        ]
    ))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})



