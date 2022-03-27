import React, {useEffect} from "react";
import {useAppSelector} from "../../bll/store";
import {TodolistType} from "../../bll/types/todolistTypes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {getTasksTC} from "../../bll/thunk/taskThunk";

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)



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