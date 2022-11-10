import React, {useCallback, useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import LinearProgress from '@mui/material/LinearProgress';
import Container from "@mui/material/Container";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../TodolistList/TodolistsList";
import {Login} from "../Login/Login";
import CircularProgress from '@mui/material/CircularProgress';
import style from './AppBarContainer.module.css'
import {selectIsInitialized, selectIsLoggedIn, selectStatus} from "../../bll/selectors";
import {authActions} from "../../bll/thunk";
import {useActions} from "../../utils/redux-utils";
import {useSelector} from "react-redux";


export const AppBarContainer = () => {

    const {logout, isAuth} = useActions(authActions)

    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)


    useEffect(() => {
        if (!isInitialized) {
            isAuth()
        }
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
                    <Typography variant="h6">Menu</Typography>
                    {isLoggedIn &&
                        <Button color="inherit" onClick={handleLogOut}>Log Out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                {!isLoggedIn ? <Login/> :
                    <Routes>
                        <Route path='/' element={<TodolistsList demo={false}/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>}


            </Container>
            <ErrorSnackbar/>
        </div>
    );
};



