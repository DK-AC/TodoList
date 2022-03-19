import React from "react";
import {Provider} from "react-redux";
import {tasksReducer} from "../bll/reducers/tasksReducer";
import {AppRootStateType} from "../bll/store";
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../bll/reducers/todolistReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const initialGlobalState = {
    todolists: [
        {id: 'todoListId1', title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: 'todoListId2', title: "What to buy", filter: "all", addedDate: '', order: 0}
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}