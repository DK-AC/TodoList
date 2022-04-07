import React, {useCallback} from 'react';
import {addTodolistAC} from "../../bll/actions/todolistActions";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {AppRootStateType} from "../../bll/store";
import {useDispatch, useSelector} from "react-redux";
import {TodolistFromServerType} from "../../dal/api/todolists-api";
import {TasksStateType} from '../Task/Task';

export const TodolistList = () => {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, TodolistFromServerType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC({todolist: {title}})
        dispatch(action)
    }, [])


    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (
                        <Grid key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist todolist={tl} tasks={allTodolistTasks}/>
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </Container>
    );
};

function useAppSelector<T>(arg0: (state: import("redux").CombinedState<{ todolists: TodolistFromServerType[]; tasks: TasksStateType; }>) => TodolistFromServerType[]) {
    throw new Error('Function not implemented.');
}

