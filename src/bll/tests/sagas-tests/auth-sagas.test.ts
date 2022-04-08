import {isAuthAppWorkerSaga, login, loginAppWorkerSaga, logout, logoutWorkerSaga} from "../../sagas/sagas_auth";
import {authApi} from "../../../dal/api/authApi";
import {call, put} from "redux-saga/effects";
import {MeResponseType} from "../../types/authTypes";
import {setIsInitializedAC, setIsLoggedInAC} from "../../actions/authActions";
import {setAppStatusAC} from "../../actions/appActions";

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

    let result = gen.next()
    expect(result.value).toEqual(call(authApi.me))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsInitializedAC(true)))
})

test('isAuthAppWorkerSaga login failed ', () => {
    let gen = isAuthAppWorkerSaga()

    let result = gen.next()
    expect(result.value).toEqual(call(authApi.me))

    meResponse.resultCode = 1

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsInitializedAC(true)))
})

test('loginAppWorkerSaga user login ', () => {

    let actionData = {email: 'Den@gmail.com', rememberMe: false, password: '1234'}
    let gen = loginAppWorkerSaga(login(actionData))

    let result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("loading")))

    result = gen.next()
    expect(result.value).toEqual(call(authApi.logIn, actionData))

    result = gen.next()
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("succeeded")))
})

test('logoutWorkerSaga user logout ', () => {

    let gen = logoutWorkerSaga()

    let result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("loading")))

    result = gen.next()
    expect(result.value).toEqual(call(authApi.logOut))

    result = gen.next()
    expect(result.value).toEqual(put(setIsLoggedInAC(false)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppStatusAC("succeeded")))
})