import {appReducer, InitialAppStateType} from "../reducers/appReducer";
import {setAppError, setAppStatus} from "../actions/appActions";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        error: null,
        appStatus: 'idle',
    }
})

test('correct error message should be set', () => {
    let endState = appReducer(startState, setAppError('error'))

    expect(startState.error).toBeNull()
    expect(endState.error).toBe('error')
})

test('status  should be changed', () => {
    let endState = appReducer(startState, setAppStatus('succeeded'))

    expect(startState.appStatus).toBe('idle')
    expect(endState.appStatus).toBe('succeeded')
})