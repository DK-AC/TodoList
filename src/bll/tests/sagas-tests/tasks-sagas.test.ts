import {addTask, addTaskWorkerSaga, fetchTasks, fetchTasksWorkerSaga} from "../../sagas/sagas_task";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../actions/appActions";
import {tasksApi} from "../../../dal/api/tasks-api";
import {addTaskAC, getTasksAC} from "../../actions/taskActions";
import {TaskResponseType, TaskType} from "../../types/taskTypes";

let todolistId = 'todoListId'

let fakeAPITasks: TaskResponseType
let task: TaskType

beforeEach(() => {

    fakeAPITasks = {
        error: '',
        totalCount: 1,
        items: [{
            addedDate: '', deadline: '', description: '', id: '1', order: 0,
            priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
        }]
    }

    task = {
        addedDate: '', deadline: '', description: '', id: '1', order: 0,
        priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
    }
})


test('fetchTasksWorkerSaga tasks should be set', () => {

    const gen = fetchTasksWorkerSaga(fetchTasks(todolistId))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.getTasks, todolistId))

    const fakeAPITasks: TaskResponseType = {
        error: '',
        totalCount: 1,
        items: [{
            addedDate: '', deadline: '', description: '', id: '1', order: 0,
            priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
        }]
    }

    expect(gen.next(fakeAPITasks).value).toEqual(put(getTasksAC(todolistId, fakeAPITasks.items)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('addTaskWorkerSaga tasks should be added', () => {
    const gen = addTaskWorkerSaga(addTask(todolistId, 'Saga Task'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(tasksApi.createTask, todolistId, 'Saga Task'))
    expect(gen.next(task).value).toEqual(put(addTaskAC(task)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))

})