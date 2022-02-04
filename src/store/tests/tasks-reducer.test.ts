import {tasksReducer} from "../reducers/tasks-reducer";
import {TasksStateType} from "../../app/App";
import {addTaskAC, removeTaskAC} from "../actions/taskActions";

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
            {id: '2', title: 'Graph QL', isDone: false},
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

    let endState = tasksReducer(startState, addTaskAC({todoId: 'todolistId2', taskId: '1', title: 'newTaskTitle'}))

    expect(startState['todolistId2']).toEqual(
        [
            {id: '1', title: 'Rest Api', isDone: false},
            {id: '2', title: 'Graph QL', isDone: false},
            {id: '3', title: 'Material UI', isDone: false}
        ])
    expect(startState['todolistId2'][0].title).toBe('Rest Api')
    expect(endState['todolistId2'][0].title).toBe('newTaskTitle')
    expect(endState['todolistId2']).toEqual(
        [
            {id: '1', title: 'newTaskTitle', isDone: false},
            {id: '2', title: 'Graph QL', isDone: false},
            {id: '3', title: 'Material UI', isDone: false}
        ])
})
