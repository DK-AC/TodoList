import {initialAppState, setAppErrorAC, setAppStatusAC,} from "../reducers/appReducer";
import {appReducer} from "../reducers";

let startState = initialAppState

beforeEach(() => {
    startState = {
        error: null,
        appStatus: 'idle',
    }
})

test('correct error message should be set', () => {
    let endState = appReducer(startState, setAppErrorAC({error: "error"}))

    expect(startState.error).toBeNull()
    expect(endState.error).toBe('error')
})

test('status  should be changed', () => {
    let endState = appReducer(startState, setAppStatusAC({appStatus: "succeeded"}))

    expect(startState.appStatus).toBe('idle')
    expect(endState.appStatus).toBe('succeeded')
})