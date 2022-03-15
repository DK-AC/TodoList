import React, {useCallback, useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {TodolistType} from "../../dal/api/todolists-api";
import {Todolist} from '../Todolist/Todolist';
import {addTodolistTC, setTodolistsTC} from "../../bll/thunk/todolistThunk";

export const AppBarContainer = () => {

    const dispatch = useDispatch()

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(setTodolistsTC(todolists))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (
                            <Grid key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist todoId={tl.id}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
    );
};

