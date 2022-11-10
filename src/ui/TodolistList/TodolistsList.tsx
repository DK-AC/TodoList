import React, {useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {
    AddItemForm,
    AddItemFormHelperType
} from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";
import {todolistsActions} from "../../bll/thunk";
import {Todolist} from "./Todolist/Todolist";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {useSelector} from "react-redux";
import {selectIsLoggedIn, selectTodolists} from "../../bll/selectors";
import {AppRootStateType} from "../../utils/types";
import {TasksStateType} from "../../dal/api/types";
import style from './TodolistsList.module.css'

type PropsType = { demo?: boolean }

export const TodolistsList = ({demo}: PropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {fetchTodolists} = useActions(todolistsActions)

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const addTodolistHandle = useCallback(async (title: string, helper: AddItemFormHelperType) => {
        let thunk = todolistsActions.addTodolist(title)

        const action = await dispatch(thunk)

        if (todolistsActions.addTodolist.rejected.match(action)) {
            if (action.payload?.errors?.length) {
                const error = action.payload.errors[0]
                helper.setError(error)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todolists.length) {
            fetchTodolists()
        }
    }, [])

    if (!isLoggedIn) {
        navigate('/login')
    }


    return (<>
            <Grid style={{padding: '20px'}}>
                <AddItemForm callback={addTodolistHandle}/>
            </Grid>
            <Grid  spacing={3} className={style.container}>
                {todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (
                        <Grid item xs="auto" key={tl.id}>
                            <div className={style.todolist}>
                                <Todolist todo={tl} demo={demo} tasks={allTodolistTasks}/>
                            </div>
                        </Grid>)
                })}
            </Grid>
        </>
    )
}