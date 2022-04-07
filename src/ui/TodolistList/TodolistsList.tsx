import React, {useCallback, useEffect} from "react";
import {useAppSelector} from "../../bll/store";
import {TodolistType} from "../../bll/types/todolistTypes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useDispatch} from "react-redux";
import {addTodolistTC, fetchTodolists} from "../../bll/sagas/sagas_todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    if (!isLoggedIn) {
        navigate('/login')
    }


    return (<>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    return (
                        <Grid key={tl.id} style={{padding: '20px'}}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist todo={tl} demo={demo}/>
                            </Paper>
                        </Grid>)
                })}
            </Grid>
        </>
    )
}