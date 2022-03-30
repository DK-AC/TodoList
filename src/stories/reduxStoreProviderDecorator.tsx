import React from "react";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {AppRootStateType, rootReducer} from "../bll/store";
import {HashRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";

export const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todoListId1', title: "What to learn", filter: "all", addedDate: '', order: 0, status: 'idle'},
        {id: 'todoListId2', title: "What to buy", filter: "all", addedDate: '', order: 0, status: 'idle'}
    ],
    tasks: {
        ['todoListId1']: [
            {
                id: '1',
                title: 'HTML',
                status: 0,
                todoListId: 'todoListId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
            {
                id: '2',
                title: 'JS',
                status: 0,
                todoListId: 'todoListId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
            {
                id: '3',
                title: 'React',
                status: 0,
                todoListId: 'todoListId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
        ],
        ['todoListId2']: [
            {
                id: '1',
                title: 'Rest Api',
                status: 0,
                todoListId: 'todoListId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
            {
                id: '2',
                title: 'Graph QL',
                status: 0,
                todoListId: 'todoListId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
            {
                id: '3',
                title: 'Material UI',
                status: 0,
                todoListId: 'todoListId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: ''
            },
        ]
    },
    app: {
        error: null,
        appStatus: 'succeeded',
    },
    auth: {
        isInitialized: true,
        isLoggedIn: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
});

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}

export const HashRouterDecorator = (story: any) => {
    return <HashRouter>{story()}</HashRouter>
}