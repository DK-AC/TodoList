import {
    addTask,
    addTaskWorkerSaga,
    fetchTasks,
    fetchTasksWorkerSaga,
    removeTask,
    removeTaskWorkerSaga
} from "../../sagas/sagas_task";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../actions/appActions";
import {tasksApi} from "../../../dal/api/tasks-api";
import {addTaskAC, getTasksAC, removeTaskAC} from "../../actions/taskActions";
import {ResponseType, TaskResponseType, TaskType} from "../../types/taskTypes";

let todolistId = 'todoListId'

let fakeAPITasks: TaskResponseType
let fakeResponseTask: ResponseType<{ item: TaskType }>

beforeEach(() => {

    fakeAPITasks = {
        error: '',
        totalCount: 1,
        items: [{
            addedDate: '', deadline: '', description: '', id: '1', order: 0,
            priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
        }]
    }

    fakeResponseTask = {
        data: {
            item: {
                addedDate: '', deadline: '', description: '', id: '1', order: 0,
                priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
            }
        }, fieldsErrors: [],
        resultCode: 0,
        messages: []

    }
})


test('fetchTasksWorkerSaga tasks should be set', () => {

    const gen = fetchTasksWorkerSaga(fetchTasks(todolistId))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.getTasks, todolistId))

    expect(gen.next(fakeAPITasks).value).toEqual(put(getTasksAC(todolistId, fakeAPITasks.items)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('addTaskWorkerSaga tasks should be added', () => {
    const gen = addTaskWorkerSaga(addTask(todolistId, 'Saga Task'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.createTask, todolistId, 'Saga Task'))
    expect(gen.next(fakeResponseTask).value).toEqual(put(addTaskAC(fakeResponseTask.data.item)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('removeTaskWorkerSaga tasks should be removed', () => {
    const gen = removeTaskWorkerSaga(removeTask(todolistId, '1'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.removeTask, todolistId, '1'))
    expect(gen.next().value).toEqual(put(removeTaskAC(todolistId, '1')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})