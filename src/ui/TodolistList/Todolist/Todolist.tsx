import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task} from "../../Task/Task";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {removeTodolist, updateTodolistTC} from "../../../bll/thunk/todolistThunk";
import {addTask, fetchTasks} from "../../../bll/thunk/taskThunk";
import {TaskType} from "../../../bll/types/taskTypes";
import {TodolistType} from "../../../bll/types/todolistTypes";
import {changeTodolistFilterAC} from "../../../bll/reducers/todolistsReducer";

type PropsType = { todo: TodolistType, demo?: boolean }

export const Todolist = React.memo(({todo, demo = false}: PropsType) => {

    const dispatch = useAppDispatch()

    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todo.id])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasks(todo.id))
    }, [])

    const removeTodolistHandler = () => dispatch(removeTodolist(todo.id))
    const changeTodolistTitleHandler = (title: string) => dispatch(updateTodolistTC(todo.id, title))
    const addTaskHandler = useCallback((title: string) => dispatch(addTask({
        todolistId: todo.id,
        title
    })), [dispatch, todo.id])
    const changeTodolistAllFilterHandler = () => dispatch(changeTodolistFilterAC({todolistId: todo.id, filter: 'all'}))
    const changeTodolistActiveFilterHandler = () => dispatch(changeTodolistFilterAC({
        todolistId: todo.id,
        filter: 'active'
    }))
    const changeTodolistCompletedFilterHandler = () => dispatch(changeTodolistFilterAC({
        todolistId: todo.id,
        filter: 'completed'
    }))

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
                <IconButton onClick={removeTodolistHandler} disabled={todo.status === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callback={addTaskHandler} disabled={todo.status === 'loading'}/>
                {tasksForTodolist.map(task => {
                    return <Task key={todo.id + task.id} todoId={todo.id} filteredTask={task}/>
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
