import {appReducer, InitialStateType} from "../reducers/appReducer";
import {setError, setStatus} from "../actions/appActions";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        appStatus: 'idle'
    }
})

test('correct error message should be set', () => {
    let endState = appReducer(startState, setError('error'))

    expect(startState.error).toBeNull()
    expect(endState.error).toBe('error')
})

test('status  should be changed', () => {
    let endState = appReducer(startState, setStatus('succeeded'))

    expect(startState.appStatus).toBe('idle')
    expect(endState.appStatus).toBe('succeeded')
})