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
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {addTodolistTC, setTodolistsTC} from "../../bll/thunk/todolistThunk";
import {TodolistType} from "../../bll/types/todolistTypes";
import {TodolistsList} from '../TodolistsList';

export const AppBarContainer = () => {

    const dispatch = useDispatch()

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(setTodolistsTC(todolists))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

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
                    <TodolistsList/>
                </Grid>
            </Container>
        </div>
    );
};



