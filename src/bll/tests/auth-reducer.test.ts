import {authReducer, initialAuthState, setIsLoggedInAC} from "../reducers/authReducer";
import {isAuth} from "../thunk/authThunk";

let startState = initialAuthState

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isInitialized: false
    }
})

test('user should be logged in', () => {
    let endState = authReducer(startState, setIsLoggedInAC({isLoggedIn: true}))

    expect(startState.isLoggedIn).toBeFalsy()
    expect(endState.isLoggedIn).toBeTruthy()
})

test('status  should be changed', () => {
    const action = isAuth.fulfilled(undefined, 'requestId')

    let endState = authReducer(startState, action)

    expect(startState.isInitialized).toBeFalsy()
    expect(endState.isInitialized).toBeTruthy()
})