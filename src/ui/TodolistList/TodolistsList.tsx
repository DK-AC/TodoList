import React, {useEffect} from "react";
import {useAppSelector} from "../../bll/store";
import {TodolistType} from "../../bll/types/todolistTypes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useDispatch} from "react-redux";
import {setTodolistsTC} from "../../bll/thunk/todolistThunk";

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const dispatch = useDispatch()

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTodolistsTC(todolists))
    }, [dispatch])


    return (
        <>
            {todolists.map(tl => {
                return (
                    <Grid key={tl.id} style={{padding: '20px'}}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist todoId={tl.id} demo={demo}/>
                        </Paper>
                    </Grid>)
            })}</>
    )
}