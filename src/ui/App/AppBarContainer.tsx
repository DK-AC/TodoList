import React, {useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import {useDispatch} from "react-redux";
import {setTodolistsTC} from "../../bll/thunk/todolistThunk";
import {TodolistList} from "../Todolist/TodolistList";

export const AppBarContainer = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
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
            <TodolistList/>
        </div>
    );
};

