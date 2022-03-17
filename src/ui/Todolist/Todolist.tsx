import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task} from "../Task/Task";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {changeTodolistFilterAC} from "../../bll/actions/todolistActions";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {addTaskAC} from "../../bll/actions/taskActions";
import {TodolistType} from "../../dal/api/todolists-api";
import {deleteTodolistTC, updateTodolistTC} from "../../bll/thunk/todolistThunk";
import {getTasksTC} from "../../bll/thunk/taskThunk";
import {TaskFromServerType} from "../../dal/api/tasks-api";

type PropsType = { todoId: string }
export type FilterTodolistType = 'all' | 'active' | 'completed'

export const Todolist = React.memo(({todoId}: PropsType) => {

    const dispatch = useDispatch()

    let todo = useAppSelector<TodolistType>(state => state.todolists.filter(todo => todo.id === todoId)[0])
    let tasks = useAppSelector<TaskFromServerType[]>(state => state.tasks[todoId])

    useEffect(() => {
        dispatch(getTasksTC({todolistId: todo.id}))
    }, [])

    const removeTodolistHandler = () => dispatch(deleteTodolistTC(todo.id))
    const changeTodolistTitleHandler = (title: string) => dispatch(updateTodolistTC(todo.id, title))
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC({todolistId: todo.id, title})), [])
    const changeTodolistAllFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todolistId: todo.id, filter: 'all'}))
    }
    const changeTodolistActiveFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todolistId: todo.id, filter: 'active'}))
    }
    const changeTodolistCompletedFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todolistId: todo.id, filter: 'completed'}))
    }

    let tasksForTodolist = tasks

    if (todo.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.status)
    }
    if (todo.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todo.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callback={addTaskHandler}/>
                {tasksForTodolist.map(task => {
                    return <Task key={todo.id} todoId={todo.id} filteredTask={task}/>
                })}

            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={todo.filter === 'all' ? 'outlined' : 'text'}
                        onClick={changeTodolistAllFilterHandler}
                        color={'inherit'}
                >
                    All
                </Button>
                <Button variant={todo.filter === 'active' ? 'outlined' : 'text'}
                        onClick={changeTodolistActiveFilterHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={todo.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={changeTodolistCompletedFilterHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
})
