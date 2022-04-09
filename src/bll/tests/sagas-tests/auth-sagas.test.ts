import {isAuthAppWorkerSaga, login, loginAppWorkerSaga, logoutWorkerSaga} from "../../sagas/sagas_auth";
import {authApi} from "../../../dal/api/authApi";
import {call, put} from "redux-saga/effects";
import {MeResponseType} from "../../types/authTypes";
import {setIsInitializedAC, setIsLoggedInAC} from "../../actions/authActions";
import {setAppErrorAC, setAppStatusAC} from "../../actions/appActions";

let meResponse: MeResponseType

beforeEach(() => {
    meResponse = {
        resultCode: 0,
        data: {login: '', email: '', id: 2},
        fieldsErrors: [],
        messages: []
    }
})

test('isAuthAppWorkerSaga login success', () => {
    let gen = isAuthAppWorkerSaga()

    expect(gen.next().value).toEqual(call(authApi.me))
    expect(gen.next(meResponse).value).toEqual(put(setIsLoggedInAC(true)))
    expect(gen.next(meResponse).value).toEqual(put(setIsInitializedAC(true)))
})

test('isAuthAppWorkerSaga login failed ', () => {
    let gen = isAuthAppWorkerSaga()

    meResponse.resultCode = 1

    expect(gen.next().value).toEqual(call(authApi.me))
    expect(gen.next(meResponse).value).toEqual(put(setIsInitializedAC(true)))
})

test('loginAppWorkerSaga user login ', () => {

    let actionData = {email: 'Den@gmail.com', rememberMe: false, password: '1234'}
    let gen = loginAppWorkerSaga(login(actionData))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(authApi.logIn, actionData))

})

test('loginAppWorkerSaga user login failed', () => {

    let actionData = {email: 'Den@gmail.com', rememberMe: false, password: '1234'}
    let gen = loginAppWorkerSaga(login(actionData))

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(authApi.logIn, actionData))
    expect(gen.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error')))
    expect(gen.next().value).toEqual(put(setAppStatusAC("failed")))
})

test('logoutWorkerSaga user logout ', () => {

    let gen = logoutWorkerSaga()

    expect(gen.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(gen.next().value).toEqual(call(authApi.logOut))
    expect(gen.next().value).toEqual(put(setIsLoggedInAC(false)))
    expect(gen.next().value).toEqual(put(setAppStatusAC("succeeded")))
})