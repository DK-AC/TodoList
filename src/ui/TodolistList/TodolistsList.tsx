import React, {useCallback, useEffect} from "react";
import {useActions, useAppSelector} from "../../bll/store";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";
import {selectors} from "../../bll/selectors";
import {todolistsActions} from "../../bll/thunk";

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const navigate = useNavigate()

    const {addTodolist, fetchTodolists} = useActions(todolistsActions)

    const todolists = useAppSelector(selectors.selectTodolists)
    const isLoggedIn = useAppSelector(selectors.selectIsLoggedIn)

    const addTodolistHandle = useCallback((title: string) => {
        addTodolist(title)
    }, [])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])

    if (!isLoggedIn) {
        navigate('/login')
    }


    return (<>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callback={addTodolistHandle}/>
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