import {authReducer, initialAuthState, setIsInitializedAC, setIsLoggedInAC} from "../reducers/authReducer";

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
    let endState = authReducer(startState, setIsInitializedAC({isInitialized: true}))

    expect(startState.isInitialized).toBeFalsy()
    expect(endState.isInitialized).toBeTruthy()
})