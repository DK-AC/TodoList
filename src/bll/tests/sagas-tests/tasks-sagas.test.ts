import {
    addTask,
    addTaskWorkerSaga,
    fetchTasks,
    fetchTasksWorkerSaga,
    removeTask,
    removeTaskWorkerSaga,
    updateTask,
    updateTaskWorkerSaga
} from "../../sagas/sagas_task";
import {call, put} from "redux-saga/effects";
import {setAppErrorAC, setAppStatusAC} from "../../actions/appActions";
import {tasksApi} from "../../../dal/api/tasks-api";
import {addTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from "../../actions/taskActions";
import {ResponseItemTaskType, TaskResponseType} from "../../types/taskTypes";

let todolistId = 'todoListId'

let fakeAPITasks: TaskResponseType
let fakeResponseTask: ResponseItemTaskType

beforeEach(() => {

    fakeAPITasks = {
        error: '',
        totalCount: 1,
        items: [{
            addedDate: '', deadline: '', description: '', id: '1', order: 0,
            priority: 1, startDate: '', status: 1, title: 'Task', todoListId: todolistId
        }]
    }

    fakeResponseTask = {
        data: {
            item: {
                addedDate: '', deadline: '', description: '', id: '1', order: 0,
                priority: 1, startDate: '', status: 1, title: 'Task', todoListId: todolistId
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

test('addTaskWorkerSaga task should be added', () => {
    const gen = addTaskWorkerSaga(addTask(todolistId, 'Saga Task'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.createTask, todolistId, 'Saga Task'))
    expect(gen.next(fakeResponseTask).value).toEqual(put(addTaskAC(fakeResponseTask.data.item)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('addTaskWorkerSaga error flow', () => {
    let title = 'Saga Task';
    const gen = addTaskWorkerSaga(addTask(todolistId, title))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.createTask, todolistId, title))
    expect(gen.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("failed")))
})

test('removeTaskWorkerSaga task should be removed', () => {
    const gen = removeTaskWorkerSaga(removeTask(todolistId, '1'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.removeTask, todolistId, '1'))
    expect(gen.next().value).toEqual(put(removeTaskAC(todolistId, '1')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('updateTaskWorkerSaga task should be updated', () => {
    let updateModalTask = {title: 'New Saga Title', status: 1};
    const gen = updateTaskWorkerSaga(updateTask(todolistId, '1', updateModalTask))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.updateTask, todolistId, '1', updateModalTask))
    expect(gen.next().value).toEqual(put(updateTaskAC(todolistId, '1', updateModalTask)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})