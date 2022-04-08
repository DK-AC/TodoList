import {authReducer, InitialAuthStateType} from "../../reducers/authReducer";
import {setIsInitializedAC, setIsLoggedInAC} from "../../actions/authActions";

let startState: InitialAuthStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isInitialized: false
    }
})

test('user should be logged in', () => {
    let endState = authReducer(startState, setIsLoggedInAC(true))

    expect(startState.isLoggedIn).toBeFalsy()
    expect(endState.isLoggedIn).toBeTruthy()
})

test('status  should be changed', () => {
    let endState = authReducer(startState, setIsInitializedAC(true))

    expect(startState.isInitialized).toBeFalsy()
    expect(endState.isInitialized).toBeTruthy()
})