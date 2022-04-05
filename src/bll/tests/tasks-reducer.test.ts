import {initialGlobalState} from "../../stories/reduxStoreProviderDecorator";
import {TasksStateType} from "../types/taskTypes";
import {TodolistType} from "../types/todolistTypes";
import {addTask, fetchTasks, removeTask, updateTask} from "../thunk/taskThunk";
import {addTodolist, fetchTodolists} from "../thunk/todolistThunk";
import {tasksReducer} from "../reducers";

let startState: TasksStateType = {}

beforeEach(() => startState = initialGlobalState.tasks)

test('correct task should be removed', () => {
    let param = {todolistId: 'todoListId1', taskId: '2'};
    const action = removeTask.fulfilled(param, 'requestId', param)

    let endState = tasksReducer(startState, action)

    expect(startState['todoListId1'].length).toBe(3)
    expect(startState['todoListId1'][1].id).toBe('2')
    expect(endState['todoListId1'][1].id).toBe('3')
    expect(endState['todoListId1'].length).toBe(2)
    expect(startState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(3)

})

test('add task with the correct title', () => {

    let task = {
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
    }

    let endState = tasksReducer(startState, addTask.fulfilled({...task}, 'requestId', {
        todolistId: 'todoListId2', title: '2'
    }))

    expect(startState['todoListId2']).toEqual(initialGlobalState.tasks.todoListId2)
    expect(startState['todoListId2'][0].title).toBe('Rest Api')
    expect(endState['todoListId2'][0].title).toBe('2')
    expect(endState["todoListId2"][0].id).toBeDefined();
})

test('status of specified task should be changed', () => {

    const action = updateTask.fulfilled(
        {todolistId: "todoListId2", taskId: "2", model: {status: 1}},
        'request id', {todolistId: "todoListId2", taskId: "2", model: {status: 1}}
    )

    const endState = tasksReducer(startState, action)

    expect(startState['todoListId2'][1].status).toBe(0);
    expect(endState['todoListId2'][1].status).toBe(1);
});

test('title of specified task should be changed', () => {

    const action = updateTask.fulfilled(
        {todolistId: "todoListId1", taskId: "1", model: {title: 'New Title'}},
        'request id', {todolistId: "todoListId1", taskId: "1", model: {title: 'New Title'}}
    )

    const endState = tasksReducer(startState, action)

    expect(startState['todoListId1'][0].title).toBe('HTML');
    expect(endState['todoListId1'][0].title).toBe('New Title');
});

test('new array should be added when new todolist is added', () => {
    let payload: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0,
        filter: 'all',
        status: "idle"
    }

    const action = addTodolist.fulfilled({todolist: payload}, 'requestId', payload.title)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('empty arrays should be added when we set todolists', () => {

    let payload: TodolistType[] = [
        {id: '1', title: "title 1", filter: "all", addedDate: '', order: 0, status: "idle"},
        {id: '2', title: "title 2", filter: "all", addedDate: '', order: 0, status: "idle"}
    ]

    const action = fetchTodolists.fulfilled({todolists: payload}, 'requestId',)

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {

    const action = fetchTasks.fulfilled({
        todolistId: 'todoListId1',
        tasks: startState['todoListId1']
    }, 'requestId', 'todoListId1')

    const endState = tasksReducer({'todoListId1': [], 'todoListId2': [],}, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
})




