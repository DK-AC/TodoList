import React, {useEffect} from 'react';
import './App.css';
import {AppBarContainer} from './AppBarContainer';
import {useDispatch} from "react-redux";
import {isAuthTC} from "../../bll/thunk/appThunk";
import {useAppSelector} from "../../bll/store";
import {Login} from '../Login/Login';

type PropsType = { demo?: boolean }

export const App = ({demo = false}: PropsType) => {

    const dispatch = useDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(isAuthTC())
    }, [])

    return (isInitialized ? <AppBarContainer demo={demo}/> : <Login/>)
}

