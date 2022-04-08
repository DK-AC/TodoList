import {
    addTodolist,
    addTodolistWorkerSaga,
    fetchTodolistsWorkerSaga,
    removeTodolist,
    removeTodolistWorkerSaga,
    updateTodolist,
    updateTodolistWorkerSaga
} from "../../sagas/sagas_todolist";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../actions/appActions";
import {todolistsApi} from "../../../dal/api/todolists-api";
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "../../actions/todolistActions";
import {ResponseType} from "../../types/taskTypes";
import {ResponseTodolistType, TodolistType} from "../../types/todolistTypes";


let responseTodolists: ResponseType<{ item: TodolistType[] }>
let responseTodolist: ResponseTodolistType

beforeEach(() => {
    responseTodolists = {
        data: {
            item: [
                {
                    id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '',
                    order: 0, status: "idle"
                },
                {
                    id: 'todolistId2', title: "What to buy", filter: "all", addedDate: '',
                    order: 0, status: "idle"
                }
            ]
        },
        fieldsErrors: [],
        resultCode: 0,
        messages: []
    }

    responseTodolist = {
        data: {
            item: {
                id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '',
                order: 0, status: "idle"
            },
        },
        fieldsErrors: [],
        resultCode: 0,
        messages: []
    }
})

test('fetchTodolistsWorkerSaga todolists should be fetch', () => {
    const gen = fetchTodolistsWorkerSaga()

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsApi.getTodolists))
    expect(gen.next(responseTodolists.data.item).value).toEqual(put(setTodolistsAC(responseTodolists.data.item)))
})

test('addTodolistWorkerSaga todolist should be added', () => {
    const gen = addTodolistWorkerSaga(addTodolist('New Todolist Saga'))

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsApi.createTodolist, 'New Todolist Saga'))
    expect(gen.next(responseTodolist).value).toEqual(put(addTodolistAC(responseTodolist.data.item)))
})

test('removeTodolistWorkerSaga todolist should be removed', () => {
    const gen = removeTodolistWorkerSaga(removeTodolist('todolistId1'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(put(changeTodolistStatusAC('todolistId1', "loading")))
    expect(gen.next().value).toEqual(call(todolistsApi.deleteTodolist, 'todolistId1'))
    expect(gen.next().value).toEqual(put(removeTodolistAC('todolistId1')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})

test('updateTodolistWorkerSaga todolist should be updated', () => {
    const gen = updateTodolistWorkerSaga(updateTodolist('todolistId1', 'new'))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(put(changeTodolistStatusAC('todolistId1', "loading")))
    expect(gen.next().value).toEqual(call(todolistsApi.updateTodolist, 'todolistId1', 'new'))
    expect(gen.next().value).toEqual(put(changeTodolistTitleAC('todolistId1', 'new')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
    expect(gen.next().value).toEqual(put(changeTodolistStatusAC('todolistId1', "succeeded")))
})