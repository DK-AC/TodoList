import React, {useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from "@mui/material/Container";
import {useAppSelector} from "../../bll/store";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {TodolistsList} from "../TodolistList/TodolistsList";
import {Login} from "../Login/Login";
import {useDispatch} from "react-redux";
import {isAuthTC} from "../../bll/thunk/authThunk";

type PropsType = { demo?: boolean }

export const AppBarContainer = ({demo}: PropsType) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoading = useAppSelector(state => state.app.appStatus)
    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    useEffect(() => {
        dispatch(isAuthTC())
        if (isInitialized) {
            return
        } else {
            navigate('/login')
        }
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
            {isLoading === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
};



