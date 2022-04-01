import React, {useCallback, useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from "@mui/material/Container";
import {useActions, useAppSelector} from "../../bll/store";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../TodolistList/TodolistsList";
import {Login} from "../Login/Login";
import CircularProgress from '@mui/material/CircularProgress';
import style from './AppBarContainer.module.css'
import {selectors} from "../../bll/selectors";
import {authActions} from "../../bll/thunk";

type PropsType = { demo?: boolean }

export const AppBarContainer = ({demo}: PropsType) => {

    const {logout, isAuth} = useActions(authActions)

    const status = useAppSelector(selectors.selectStatus)
    const isInitialized = useAppSelector(selectors.selectIsInitialized)
    const isLoggedIn = useAppSelector(selectors.selectIsLoggedIn)


    useEffect(() => {
        if (!demo) isAuth()
    }, [])

    const handleLogOut = useCallback(() => {
        logout()
    }, [isInitialized])

    if (!isInitialized) {
        return <div className={style.circular}><CircularProgress/></div>
    }


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
                    {isLoggedIn && <Button color="inherit" onClick={handleLogOut}>Log Out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
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



