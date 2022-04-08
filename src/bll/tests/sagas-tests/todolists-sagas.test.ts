import {fetchTodolistsWorkerSaga} from "../../sagas/sagas_todolist";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../actions/appActions";
import {todolistsApi} from "../../../dal/api/todolists-api";
import {setTodolistsAC} from "../../actions/todolistActions";
import {ResponseTodolistType} from "../../types/todolistTypes";


let responseTodolist: ResponseTodolistType

beforeEach(() => {
    responseTodolist = {
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
})

test('fetchTodolistsWorkerSaga todolists should be fetch', () => {
    const gen = fetchTodolistsWorkerSaga()

    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsApi.getTodolists))
    expect(gen.next(responseTodolist.data.item).value).toEqual(put(setTodolistsAC(responseTodolist.data.item)))
})
