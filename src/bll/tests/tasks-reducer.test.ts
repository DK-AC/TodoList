import {tasksReducer} from "../reducers/tasksReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../actions/taskActions";
import {addTodolistAC, setTodolistsAC} from "../actions/todolistActions";
import {TasksStateType} from "../../ui/Task/Task";
import {TodolistType} from "../../dal/api/todolists-api";

let startState: TasksStateType = {}

beforeEach(() => {

    startState = {
        ['todolistId1']: [
            {id: '1', title: 'HTML', status: 0, todolistId: 'todolistId1',},
            {id: '2', title: 'JS', status: 0, todolistId: 'todolistId1'},
            {id: '3', title: 'React', status: 0, todolistId: 'todolistId1'},
        ],
        ['todolistId2']: [
            {id: '1', title: 'Rest Api', status: 0, todolistId: 'todolistId2'},
            {id: '2', title: 'Graph QL', status: 0, todolistId: 'todolistId2'},
            {id: '3', title: 'Material UI', status: 0, todolistId: 'todolistId2'},
        ]
    }
})

test('correct task should be removed', () => {

    let endState = tasksReducer(startState, removeTaskAC('todolistId1', '2'))

    expect(startState['todolistId1'].length).toBe(3)
    expect(startState['todolistId1'][1].id).toBe('2')
    expect(endState['todolistId1'][1].id).toBe('3')
    expect(endState['todolistId1'].length).toBe(2)
    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)

})

test('add task with the correct title', () => {

    let endState = tasksReducer(startState, addTaskAC({id: '2', title: '2', status: 0, todolistId: '123'}))

    expect(startState['todolistId2']).toEqual(
        [
            {id: '1', title: 'Rest Api', status: 0, todolistId: "todolistId2",},
            {id: '2', title: 'Graph QL', status: 0, todolistId: "todolistId2",},
            {id: '3', title: 'Material UI', status: 0, todolistId: "todolistId2",}
        ])
    expect(startState['todolistId2'][0].title).toBe('Rest Api')
    expect(endState['todolistId2'][0].title).toBe('newTaskTitle')
    expect(endState["todolistId2"][0].id).toBeDefined();

})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC("todolistId2", "2", 1))

    expect(startState['todolistId2'][1].status).toBe(0);
    expect(endState['todolistId2'][1].status).toBe(1);
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState,
        changeTaskTitleAC("todolistId1", "1", 'New Title'))

    expect(startState['todolistId1'][0].title).toBe('HTML');
    expect(endState['todolistId1'][0].title).toBe('New Title');
});

test('new array should be added when new todolist is added', () => {

    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0,
        filter: 'all'
    }

    const endState = tasksReducer(startState, addTodolistAC(todolist))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('empty arrays should be added when we set todolists', () => {

    const endState = tasksReducer(startState, setTodolistsAC(
        [
            {id: '1', title: "title 1", filter: "all", addedDate: '', order: 0},
            {id: '2', title: "title 2", filter: "all", addedDate: '', order: 0}
        ]
    ))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})




