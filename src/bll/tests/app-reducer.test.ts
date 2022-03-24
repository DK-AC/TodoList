import {appReducer, InitialStateType} from "../reducers/appReducer";
import {setError} from "../actions/appActions";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error message should be set', () => {
    let endState = appReducer(startState, setError('error'))

    expect(endState.error).toBe('error')
})