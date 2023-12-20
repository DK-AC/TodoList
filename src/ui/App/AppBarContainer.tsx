import React, {useCallback, useEffect} from 'react';
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
import {Toolbar} from "@mui/material";


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
                <Toolbar className={style.header}>
                    <div className={style.title}>Todolist</div>
                    {isLoggedIn &&
                        <div>
                            <Button variant={"outlined"}
                                    color="inherit" onClick={handleLogOut}>
                                Log Out
                            </Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container>
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



