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
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}