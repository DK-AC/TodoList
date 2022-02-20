import {tasksReducer} from "../reducers/tasksReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../actions/taskActions";
import {addTodolistAC} from "../actions/todolistActions";
import {TasksStateType} from "../../ui/Task/Task";

let startState: TasksStateType = {}

beforeEach(() => {

    startState = {
        ['todolistId1']: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        ['todolistId2']: [
            {id: '1', title: 'Rest Api', isDone: false},
            {id: '2', title: 'Graph QL', isDone: true},
            {id: '3', title: 'Material UI', isDone: false},
        ]
    }
})

test('correct task should be removed', () => {

    let endState = tasksReducer(startState, removeTaskAC({todoId: 'todolistId1', taskId: '2'}))

    expect(startState['todolistId1'].length).toBe(3)
    expect(startState['todolistId1'][1].id).toBe('2')
    expect(endState['todolistId1'][1].id).toBe('3')
    expect(endState['todolistId1'].length).toBe(2)
    expect(startState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)

})

test('add task with the correct title', () => {

    let endState = tasksReducer(startState, addTaskAC({todoId: 'todolistId2', title: 'newTaskTitle'}))

    expect(startState['todolistId2']).toEqual(
        [
            {id: '1', title: 'Rest Api', isDone: false},
            {id: '2', title: 'Graph QL', isDone: true},
            {id: '3', title: 'Material UI', isDone: false}
        ])
    expect(startState['todolistId2'][0].title).toBe('Rest Api')
    expect(endState['todolistId2'][0].title).toBe('newTaskTitle')
    expect(endState["todolistId2"][0].id).toBeDefined();

})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC({todoId: "todolistId2", taskId: "2", isDone: false}))

    expect(startState['todolistId2'][1].isDone).toBeTruthy();
    expect(endState['todolistId2'][1].isDone).toBeFalsy();
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState,
        changeTaskTitleAC({todoId: "todolistId1", taskId: "1", title: 'New Title'}
        ))

    expect(startState['todolistId1'][0].title).toBe('HTML');
    expect(endState['todolistId1'][0].title).toBe('New Title');
});

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC({title: "new todolist"}))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});




