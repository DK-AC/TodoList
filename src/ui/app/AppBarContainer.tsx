import React, {useCallback} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './App.css';
import AppBar from '@mui/material/AppBar';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist, TodolistType} from "../Todolist/Todolist";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {addTodolistAC} from "../../bll/actions/todolistActions";

export const AppBarContainer = () => {

    const dispatch = useDispatch()

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC({title})
        dispatch(action)
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

