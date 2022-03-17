import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "../bll/reducers/tasksReducer";
import {AppRootStateType} from "../bll/store";
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../bll/reducers/todolistReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: 'todolistId2', title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: '1', title: 'HTML', status: 0, todolistId: 'todolistId1',},
            {id: '2', title: 'JS', status: 0, todolistId: 'todolistId1'},
            {id: '3', title: 'React', status: 0, todolistId: 'todolistId1'},
        ],
        ['todolistId2']: [
            {id: '1', title: 'Rest Api', status: 0, todolistId: 'todolistId2'},
            {id: '2', title: 'Graph QL', status: 0, todolistId: 'todolistId2'},
            {id: '3', title: 'Material UI', status: 0, todolistId: 'todolistId2'},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}