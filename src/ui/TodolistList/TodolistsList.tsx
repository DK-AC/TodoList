import React, {useEffect} from "react";
import {useActions, useAppSelector} from "../../bll/store";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";
import {selectors} from "../../bll/selectors";
import {todolistsActions} from "../../bll/thunk";
import {Todolist} from "./Todolist/Todolist";

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const navigate = useNavigate()

    const {addTodolist, fetchTodolists} = useActions(todolistsActions)

    const todolists = useAppSelector(selectors.selectTodolists)
    const isLoggedIn = useAppSelector(selectors.selectIsLoggedIn)

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
                <AddItemForm callback={addTodolist}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {todolists.map(tl => {
                    return (
                        <Grid item key={tl.id} >
                            <div style={{ width: '300px'}}>
                                <Todolist todo={tl} demo={demo}/>
                            </div>
                        </Grid>)
                })}
            </Grid>
        </>
    )
}