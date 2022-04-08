import {fetchTasksWorkerSaga} from "../../sagas/sagas_task";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../actions/appActions";
import {tasksApi} from "../../../dal/api/tasks-api";
import {getTasksAC} from "../../actions/taskActions";
import {TaskResponseType} from "../../types/taskTypes";


test('fetchTasksWorkerSaga tasks should be set', () => {

    let todolistId = 'todoListId'

    const gen = fetchTasksWorkerSaga({type: '', todolistId})

    let result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("loading")))

    result = gen.next()
    expect(result.value).toEqual(call(tasksApi.getTasks, todolistId))

    const fakeAPITasks: TaskResponseType = {
        error: '',
        totalCount: 1,
        items: [{
            addedDate: '', deadline: '', description: '', id: '1', order: 0,
            priority: 1, startDate: '', status: 0, title: 'Task', todoListId: todolistId
        }]
    }

    result = gen.next(fakeAPITasks)
    expect(result.value).toEqual(put(getTasksAC(todolistId, fakeAPITasks.items)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("succeeded")))
})